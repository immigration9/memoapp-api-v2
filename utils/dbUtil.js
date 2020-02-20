const uuidv4 = require('uuid/v4');

function create(content) {
  const timestamp = new Date().toISOString();
  return {
    ...content,
    id: uuidv4(),
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
