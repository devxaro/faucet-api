import {FetchAccountBalanceError, InvalidAddressError} from './account.error';
import {
  ItemCreateError,
  ItemDeleteError,
  ItemNotFoundError,
  ItemsCreateError,
  ItemsDeleteError,
  ItemsNotFoundError,
  ItemsUpdateError,
  ItemUpdateError,
  ItemUpsertError
} from './entity.error';

import {NotAllowedError, NotSupportedError as OperationalNotSupportedError, ValidationError} from './operational.error';
import {InsufficientRolesError, InvalidSignatureError, InvalidTokenError, MissingTokenError, MissingUidError, NotAuthenticatedError, NotAuthorizedError} from './security.error';
import {DatabaseError, ExternalAPIError, ExternalCmdError, InternalError, JobError, MaintenanceError, NetworkError, NotSupportedError} from './technical.error';
import {SendTransactionError} from './wallet.error';

export const EntityErrors = {
  ItemNotFoundError,
  ItemUpdateError,
  ItemsUpdateError,
  ItemCreateError,
  ItemsCreateError,
  ItemDeleteError,
  ItemsDeleteError,
  ItemsNotFoundError,
  ItemUpsertError
};

export const AccountErrors = {
  InvalidAddressError,
  FetchAccountBalanceError
};

export const WalletErrors = {
  SendTransactionError
};

export const SecurityErrors = {
  NotAuthorizedError,
  NotAuthenticatedError,
  MissingTokenError,
  InvalidTokenError,
  InvalidSignatureError,
  InsufficientRolesError,
  MissingUidError
};

export const TechnicalErrors = {
  NetworkError,
  ExternalAPIError,
  ExternalCmdError,
  InternalError,
  DatabaseError,
  NotSupportedError,
  MaintenanceError,
  JobError
};

export const OperationalErrors = {
  NotAllowedError,
  ValidationError,
  NotSupportedError: OperationalNotSupportedError
};
