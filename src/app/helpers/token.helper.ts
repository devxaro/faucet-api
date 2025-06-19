import {FastifyRequest} from 'fastify';
import jwt from 'jsonwebtoken';
import {appConfig} from '../../config/app.config';
import {RolesType} from '../core/enums';

export const decodeToken = (token: string) => {
  try {
    return jwt.decode(token, {complete: true});
  } catch (e) {
    throw new Error('Invalid token');
  }
};

export const tokenExpirationInSecond = (expirationTime: number): number => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);

  const expirationTimeInSeconds = expirationTime > 1e10 ? Math.floor(expirationTime / 1000) : expirationTime;

  const ttl = expirationTimeInSeconds - currentTimeInSeconds;
  return ttl > 0 ? ttl : 0;
};

export const generateToken = (uid: string, roles: RolesType[], expiresIn: number) => {
  return jwt.sign(
    {
      uid,
      roles
    },
    appConfig.jwtSecretKey,
    {expiresIn}
  );
};

export const verifyJwtToken = async (request: FastifyRequest) => {
  const verifyToken = async (verifyMethod: () => Promise<any>) => {
    try {
      return await verifyMethod();
    } catch (error) {
      return null;
    }
  };

  const result = await Promise.all([verifyToken(() => request['defaultJwtVerify']())]);

  const decodedToken = result.find(tokenInfo => tokenInfo);

  if (!decodedToken) {
    throw new Error('Invalid Token');
  }
};
