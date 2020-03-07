const httpStatus = require('http-status-codes');

module.exports = {
  createResponse: (data, status = httpStatus.OK) => {
    return {
      httpStatus: status,
      status: 'successful',
      responseData: data,
    };
  },
  createError: (details, status = httpStatus.BAD_REQUEST) => {
    return {
      httpStatus: status,
      status: 'failed',
      errorDetails: details,
    };
  },
};
