const shortid = require('shortid');

module.exports = {
  create: content => {
    const timestamp = new Date().toISOString();
    return {
      ...content,
      id: shortid.generate(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  },
  update: content => {
    const timestamp = new Date().toISOString();
    return {
      ...content,
      updatedAt: timestamp,
    };
  },
};
