const db = require('../models/database');
const {
  getRelationByLabelId,
  getRelationByMemoId,
  getMemoByMemoId,
  getLabelByLabelId,
} = require('../utils/relationUtil');

module.exports = {
  addMemosToLabel: (req, res) => {
    const labelId = req.params.id;
    const { memoIds } = req.body;

    const parsedMemoIds = JSON.parse(memoIds);

    if (parsedMemoIds && parsedMemoIds.length > 0) {
      parsedMemoIds.forEach(memoId => {
        const relations = getRelationByMemoId(memoId);
        const exists = relations.find(relation => relation.labelId === labelId);
        if (!exists) {
          db.get('labelsToMemos')
            .push({ labelId, memoId })
            .write();
        }
      });
    }

    const label = getLabelByLabelId(labelId);
    if (label) {
      const labelToMemo = getRelationByLabelId(label.id);
      label.memos = labelToMemo.map(item => getMemoByMemoId(item.memoId)) || [];
      res.send(label);
    } else {
      res.status(500).send('unable to retrieve label data');
    }
  },
  deleteMemosFromLabel: (req, res) => {
    const labelId = req.params.id;
    const { memoIds } = req.body;

    const parsedMemoIds = JSON.parse(memoIds);

    if (parsedMemoIds && parsedMemoIds.length > 0) {
      parsedMemoIds.forEach(memoId => {
        const relations = getRelationByMemoId(memoId);
        const exists = relations.find(relation => relation.labelId === labelId);
        if (exists) {
          db.get('labelsToMemos')
            .remove({ labelId, memoId })
            .write();
        }
      });
    }

    const label = getLabelByLabelId(labelId);
    if (label) {
      const labelToMemo = getRelationByLabelId(label.id);
      label.memos = labelToMemo.map(item => getMemoByMemoId(item.memoId)) || [];
      res.send(label);
    } else {
      res.status(500).send('unable to retrieve label data');
    }
  },
};
