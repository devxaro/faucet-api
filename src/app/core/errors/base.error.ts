export class BaseError extends Error {
  // http Status code
  #status;

  // functional error code
  #errorCode;

  // A key value map: contains additional details about the error
  #tips;

  #params;
  #previousError;

  /**
   * @param {string} message - error description
   * @param {Enum} status : 400, 401, 403, 500
   * @param {string} errorCode -
   * @param {boolean} isInternalError - default true - whether the error have to be recorded to the 'bug' table or not
   *  (normally, only Runtime and Technical Errors should be recorded as the stack trace should help for further debug)
   * @param previousError
   */
  constructor(
    message,
    status,
    errorCode,
    public isInternalError = true,
    previousError = null
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.isInternalError = isInternalError;

    this.#status = status;

    this.#errorCode = errorCode;

    this.#previousError = previousError;

    this.#tips = {};

    if (previousError instanceof Error) {
      this.stack = previousError.stack + '\nCaused by: ' + this.stack;
    }
  }

  get status() {
    return this.#status;
  }

  get errorCode() {
    return this.#errorCode;
  }

  get previousError() {
    return this.#previousError;
  }

  get tips() {
    return this.#tips;
  }

  get params() {
    return this.#params;
  }

  addTip(key, value) {
    const message = this.getErrorMessage(value);
    this.#tips[key] = message;
    return this;
  }

  /**
   *
   * @param {Strings} params
   */
  withParams(...params) {
    this.#params = params;
    for (let i = 0; i < params.length; i++) {
      this.message = this.message.replace('{' + i + '}', params[i]);
    }

    return this;
  }

  /**
   * Get message from error
   * @param {string|object} error
   * @returns {string} error message
   */
  getErrorMessage(error) {
    if (typeof error === 'string') {
      return error;
    } else if (typeof error === 'object') {
      if (Array.isArray(error.errors) && error.errors.length > 0 && error.errors[0].errorMessage) {
        return error.errors[0].errorMessage;
      } else if (error.message && typeof error.message === 'string') {
        return error.message;
      } else {
        return JSON.stringify(error);
      }
    }

    throw new Error('Error must be a string or object');
  }

  toString() {
    let errorString = this.message + '\nIsInternal: ' + this.isInternalError;

    for (const key of Object.keys(this.tips)) {
      errorString = errorString + '\n' + key + ': ' + this.tips[key];
    }

    return errorString;
  }
}
