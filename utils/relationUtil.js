const db = require('../models/database');

function getRelationByLabelId(labelId) {
  return db
    .get('labelsToMemos')
    .filter(item => item.labelId === labelId)
    .value();
}

function getRelationByMemoId(memoId) {
  return db
    .get('labelsToMemos')
    .filter(item => item.memoId === memoId)
    .value();
}

function getLabelByLabelId(labelId) {
  return db
    .get('labels')
    .find({ id: labelId })
    .value();
}

function getMemoByMemoId(memoId) {
  return db
    .get('memos')
    .find({ id: memoId })
    .value();
}

module.exports = {
  getRelationByLabel,
  getRelationByMemoId,
  getLabelByLabelId,
  getMemoByMemoId,
};
