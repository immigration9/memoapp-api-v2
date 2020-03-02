const express = require('express');
const router = express.Router();

const { create, update } = require('../utils/dbUtil');
const {
  getRelationByLabelId,
  getRelationByMemoId,
  getMemoByMemoId,
  getLabelByLabelId,
} = require('../utils/relationUtil');

const db = require('../models/database');

router.get('/', (req, res) => {
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
});

router.post('/', (req, res) => {
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
});

router.get('/:id', (req, res) => {
  const labelId = req.params.id;

  const label = getLabelByLabelId(labelId);

  if (label) {
    const labelToMemo = getRelationByLabelId(label.id);
    label.memos = labelToMemo.map(item => getMemoByMemoId(item.memoId)) || [];
    res.send(label);
  } else {
    res.status(500).send('invalid label id');
  }
});

router.put('/:id', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
  const labelId = req.params.id;

  const label = db
    .get('labels')
    .remove({ id: labelId })
    .write();

  /**
   * Remove from relations table
   */
  db.get('labelsToMemos').remove({ labelId });

  res.send(label);
});

router.post('/:id/memos', (req, res) => {
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
});

router.delete('/:id/memos', (req, res) => {
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
});

module.exports = router;
