import {BaseError} from './base.error';

export class NotAuthorizedError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super("Sorry, you are not authorized, backend can't process your request", 401, 'NotAuthorizedError', isInternalError, err);
  }
}

export class InsufficientRolesError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super("You don't have sufficient roles to access this resource", 401, 'InsufficientRolesError', isInternalError, err);
  }
}

export class NotAuthenticatedError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Backend can't authenticate you`, 401, 'NotAuthenticatedError', isInternalError, err);
  }
}

export class MissingTokenError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super('Authorization Header is expected', 401, 'MissingTokenError', isInternalError, err);
  }
}

export class InvalidTokenError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super('The provided Token is invalid', 401, 'InvalidTokenError', isInternalError, err);
  }
}

export class MissingUidError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super('X-uid Header or uid token metadata is expected', 401, 'MissingUidError', isInternalError, err);
  }
}

export class InvalidSignatureError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super('The provided signature is invalid', 401, 'InvalidSignatureError', isInternalError, err);
  }
}
