/**
 * Build generic error body
 * @param {string} code : the error code
 * @param {string} message : the error message
 * @param {object} details : additional details to be appended to the error object
 * @returns {object} : a json object { errors : [ { errorCode: xxx, errorMessage: xxx, ...] }
 * */
export const buildErrorObject = (code, message, details = {}) => {
  const resp = {
    errors: [
      {
        errorCode: code || '00.99.03',
        errorMessage: message || 'Unknown error'
      }
    ]
  };

  if (details && typeof details === 'object') {
    if (Object.keys(details).length > 0) {
      resp.errors[0]['tips'] = {};
    }

    for (const detail of Object.keys(details)) {
      resp.errors[0]['tips'][detail] = details[detail];
    }
  }

  return resp;
};
