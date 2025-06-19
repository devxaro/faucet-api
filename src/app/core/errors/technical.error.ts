import {BaseError} from './base.error';

export class NetworkError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Backend cannot respond to your request because it is facing a network problem while connecting with external resources`, 500, 'NetworkError', isInternalError, err);
  }
}

export class ExternalAPIError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Backend cannot respond to your request because it is facing a problem while it is trying to consume external resources`, 500, 'ExternalAPIError', isInternalError, err);
  }
}

export class ExternalCmdError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Backend cannot respond to your request because it is facing a problem while it is trying to execute command line`, 500, 'ExternalCmdError', isInternalError, err);
  }
}

export class JobError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super('An unexpected error occurred while the server was processing job: {0}', 500, 'JobError', isInternalError, err);
  }
}

export class InternalError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(
      'An unexpected error occurred while the server was processing your request. If the error reoccurs, please contact our support team',
      500,
      'InternalError',
      isInternalError,
      err
    );
  }
}

export class DatabaseError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super('An unexpected error occurred while the server was  trying to connect database', 500, 'InternalError', isInternalError, err);
  }
}

export class NotSupportedError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super('An illegal operation has been invoked', 500, 'NotSupportedError', isInternalError, err);
  }
}

export class MaintenanceError extends BaseError {
  constructor(err = null, isInternalError = false) {
    super('Sorry, API is currently under maintenance', 503, 'MaintenanceError', isInternalError, err);
  }
}
