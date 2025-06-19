import {BaseError} from './base.error';

export class SendTransactionError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Can't send transaction to {0}`, 500, 'SendTransactionError', isInternalError, err);
  }
}
