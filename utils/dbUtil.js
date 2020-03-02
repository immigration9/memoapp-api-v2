const shortid = require('shortid');

function create(content) {
  const timestamp = new Date().toISOString();
  return {
    ...content,
    id: shortid.generate(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function update(content) {
  const timestamp = new Date().toISOString();
  return {
    ...content,
    updatedAt: timestamp,
  };
}

module.exports = {
  create,
  update,
};
