import {BaseError} from './base.error';

export class InvalidAddressError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super('Only testnet addresses are allowed', 404, 'InvalidAddressError', isInternalError, err);
  }
}

export class FetchAccountBalanceError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Can't fetch account balance`, 500, 'fetchAccountBalanceError', isInternalError, err);
  }
}
