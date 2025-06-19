import {BaseError} from './base.error';

export class NotAllowedError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super("Sorry, you are not authorized, backend can't process your request", 403, 'NotAllowedError', isInternalError, err);
  }
}

export class ValidationError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Backend cannot validate your request`, 400, 'ValidationError', isInternalError, err);
  }
}

export class NotSupportedError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Backend can't process your request`, 400, 'NotSupportedError', isInternalError, err);
  }
}
