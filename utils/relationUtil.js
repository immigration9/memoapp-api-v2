const db = require('../models/database');

module.exports = {
  getRelationByLabelId: labelId => {
    return db
      .get('labelsToMemos')
      .filter(item => item.labelId === labelId)
      .value();
  },
  getRelationByMemoId: memoId => {
    return db
      .get('labelsToMemos')
      .filter(item => item.memoId === memoId)
      .value();
  },
  getLabelByLabelId: labelId => {
    return db
      .get('labels')
      .find({ id: labelId })
      .value();
  },
  getMemoByMemoId: memoId => {
    return db
      .get('memos')
      .find({ id: memoId })
      .value();
  },
};
