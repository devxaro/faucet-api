import {BaseError} from './base.error';

export class ItemNotFoundError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super("Backend can't find {0} with ID: '{1}'", 404, 'ItemNotFoundError', isInternalError, err);
  }
}

export class ItemsNotFoundError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super("Backend can't find {0}", 404, 'ItemsNotFoundError', isInternalError, err);
  }
}

export class ItemCreateError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Backend can't create {0}`, 500, 'ItemCreateError', isInternalError, err);
  }
}

export class ItemUpsertError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Backend can't upsert {0}`, 500, 'ItemUpsertError', isInternalError, err);
  }
}

export class ItemsCreateError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Backend can't create {0}s`, 500, 'ItemsCreateError', isInternalError, err);
  }
}

export class ItemUpdateError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super("Backend can't update {0} with ID: '{1}'", 500, 'ItemUpdateError', isInternalError, err);
  }
}

export class ItemsUpdateError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super(`Backend can't update {0}s`, 500, 'ItemsCreateError', isInternalError, err);
  }
}

export class ItemDeleteError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super("Backend can't delete {0} with ID: '{1}'", 500, 'ItemDeleteError', isInternalError, err);
  }
}

export class ItemsDeleteError extends BaseError {
  constructor(err = null, isInternalError = true) {
    super("Backend can't delete {0} docs", 500, 'ItemsDeleteError', isInternalError, err);
  }
}
