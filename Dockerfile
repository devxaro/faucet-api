# backend/Dockerfile
FROM node:18.20.7-alpine AS node-base

##
# Build image
#
FROM node-base AS builder

RUN apk --update --no-cache add bash vim net-tools lsof curl git g++ make python3 cmake ninja
RUN npm install pm2 typescript@5.5.3 -g

WORKDIR /app

COPY ./ ./
RUN npm install
RUN npm run build

##
# Operator
#
FROM ghcr.io/myfloki/flokicoin:0.25.7.alpha.33-prod AS operator



##
# Runtime image
#
FROM node-base

RUN apk --update --no-cache add bash vim net-tools lsof curl git g++ make python3 cmake ninja jq sudo screen
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

COPY ./package.json ./

RUN rm -f /volumes/wallet && mkdir -p /volumes/wallet \
  && rm -f /volumes/gminer && mkdir -p /volumes/gminer

COPY --chmod=0555  ./bin/docker/healthcheck ./
COPY --chmod=0555  ./bin/docker/entrypoint ./
COPY --from=operator --chmod=0555  /bin/twallet ../volumes/twallet
COPY --from=operator --chmod=0555  /bin/gminer ../volumes/gminer/gminer


HEALTHCHECK \
  --interval=10s \
  --timeout=10s \
  --retries=2 \
  --start-period=20s \
  CMD ./healthcheck

ENTRYPOINT ["./entrypoint"]
