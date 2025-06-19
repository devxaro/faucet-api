import {logger} from '../logger';

process.on('uncaughtException', (err: any) => {
  logger.error('uncaughtException : ' + err.message);
});

process.on('UnhandledPromiseRejectionWarning', (err: any) => {
  logger.error('UnhandledPromiseRejectionWarning: ' + err.message);
});

process.on('unhandledRejection', (err: any) => {
  logger.error('unhandledRejection: ' + err.message);
});
