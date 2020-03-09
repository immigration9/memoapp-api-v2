module.exports = {
  createResponse: data => {
    return {
      data,
    };
  },
  createError: details => {
    return {
      details,
    };
  },
};
