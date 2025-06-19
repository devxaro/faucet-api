# backend/Dockerfile
FROM node:18-alpine AS node-base

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
# Runtime image
#
FROM node-base

RUN apk --update --no-cache add bash vim net-tools lsof curl git g++ make python3 cmake ninja jq sudo screen
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY ./gminer ./gminer
COPY ./wallet ./wallet
COPY ./package.json ./

COPY --chmod=0555  ./bin/twallet ./
COPY --chmod=0555  ./bin/docker/healthcheck ./
COPY --chmod=0555  ./bin/docker/entrypoint ./

RUN curl -fsSL https://raw.githubusercontent.com/myfloki/community-tools/main/downloader.sh -o ./downloader.sh \
    && chmod +x ./downloader.sh \
    && ./downloader.sh
    
HEALTHCHECK \
  --interval=10s \
  --timeout=10s \
  --retries=2 \
  --start-period=20s \
  CMD ./healthcheck

ENTRYPOINT ["./entrypoint"]