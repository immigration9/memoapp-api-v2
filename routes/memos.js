const express = require('express');
const router = express.Router();

const { create, update } = require('../utils/dbUtil');
const { getMemoByMemoId } = require('../utils/relationUtil');

const db = require('../models/database');

router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (title) {
    const data = db
      .get('memos')
      .push(create({ title, content }))
      .write();

    res.send(data[data.length - 1]);
  } else {
    res.status(500).send('must provide a valid title');
  }
});

router.get('/:id', (req, res) => {
  const memoId = req.params.id;

  const memo = getMemoByMemoId(memoId);

  if (memo) {
    res.send(memo);
  } else {
    res.status(500).send('invalid memo id');
  }
});

router.put('/:id', (req, res) => {
  const memoId = req.params.id;
  const { title, content } = req.body;

  db.get('memos')
    .find({ id: memoId })
    .assign(update({ title, content }))
    .write();

  const memo = getMemoByMemoId(memoId);

  if (memo) {
    res.send(memo);
  } else {
    res.status(500).send('unable to update memo');
  }
});

router.delete('/:id', (req, res) => {
  const memoId = req.params.id;

  const data = db
    .get('memos')
    .remove({ id: memoId })
    .write();

  /**
   * Delete all relations
   */
  db.get('labelsToMemos')
    .remove({ memoId })
    .write();

  res.send(data);
});

module.exports = router;
