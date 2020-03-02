const db = require('../models/database');
const { create, update } = require('../utils/dbUtil');
const {
  getRelationByLabelId,
  getMemoByMemoId,
  getLabelByLabelId,
} = require('../utils/relationUtil');

module.exports = {
  getLabelsList: (req, res) => {
    const { populate } = req.query;
    const isUnpopulate = populate === 'false';

    const labels = db.get('labels').value();
    labels.forEach(label => {
      const labelToMemo = getRelationByLabelId(label.id) || [];

      if (isUnpopulate) {
        label.memos = labelToMemo.map(item => item.memoId);
      } else {
        label.memos = labelToMemo.map(item => getMemoByMemoId(item.memoId));
      }
    });
    res.send(labels);
  },
  createLabel: (req, res) => {
    const { title } = req.body;

    if (title) {
      const data = db
        .get('labels')
        .push(create({ title }))
        .write();

      res.send(data[data.length - 1]);
    } else {
      res.status(500).send('must provide a valid title');
    }
  },
  getLabel: (req, res) => {
    const labelId = req.params.id;

    const label = getLabelByLabelId(labelId);

    if (label) {
      const labelToMemo = getRelationByLabelId(label.id);
      label.memos = labelToMemo.map(item => getMemoByMemoId(item.memoId)) || [];
      res.send(label);
    } else {
      res.status(500).send('invalid label id');
    }
  },
  updateLabel: (req, res) => {
    const labelId = req.params.id;
    const { title } = req.body;

    db.get('labels')
      .find({ id: labelId })
      .assign(update({ title }))
      .write();

    const label = getLabelByLabelId(labelId);
    if (label && label.title === title) {
      res.send(label);
    } else {
      res.status(500).send('unable to update label');
    }
  },
  deleteLabel: (req, res) => {
    const labelId = req.params.id;

    const label = getLabelByLabelId(labelId);

    db.get('labels')
      .remove({ id: labelId })
      .write();

    /**
     * Remove from relations table
     */
    db.get('labelsToMemos').remove({ labelId });

    res.send(label);
  },
};
