import crypto from 'crypto';
import path from 'path';
import tmp from 'tmp';
import {fileURLToPath} from 'url';

export const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const getUnixTimestamp = () => {
  const now = new Date();
  return Math.floor(now.getTime() / 1000);
};

export const generateUUID = () => {
  const randomBytes = crypto.randomBytes(6).toString('hex');
  return `fp_${randomBytes}`;
};

export const generatePassword = () => {
  const randomBytes = crypto.randomBytes(8).toString('hex');
  return `${randomBytes}!`;
};

export const strToBase64 = (str: string) => {
  return Buffer.from(str).toString('base64');
};
export const addToBigInt = (a: string, b: number): string => {
  const bigIntA = BigInt(a || 0);
  const bigIntB = BigInt(b || 0);
  return (bigIntA + bigIntB).toString();
};

export const escapeSpecialCharactersFromStr = (string: string) => {
  return string.replace(/[.*+?^=!:${}()|[\]/\\]/g, '\\$&');
};

export const validateSignature = (message, receivedSignature, secretKey) => {
  const generatedSignature = crypto.createHmac('sha256', secretKey).update(message).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(generatedSignature, 'hex'), Buffer.from(receivedSignature, 'hex'));
};

export const isTimestampValid = (timestamp: any, maxMs: number): boolean => {
  const parsedTimestamp = Number(timestamp);

  if (isNaN(parsedTimestamp)) {
    throw new Error('Invalid timestamp');
  }

  const currentTimestamp = Date.now();
  return Math.abs(currentTimestamp - parsedTimestamp) <= maxMs;
};

export const createTempFile = (): string => {
  const tempFile = tmp.fileSync();
  return tempFile.name;
};

export const truncateToDecimals = (num, nbDecimal = 5) => {
  const number = parseFloat(num);
  if (isNaN(number) || !isFinite(number)) {
    return 0;
  }
  const factor = 10 ** nbDecimal;
  return Math.floor(number * factor) / factor;
};

export const base64ToStr = (encodedStr: string) => {
  return Buffer.from(encodedStr, 'base64').toString('utf-8');
};
