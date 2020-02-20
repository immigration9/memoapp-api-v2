const express = require('express');
const router = express.Router();
const qs = require('querystring');

const { create, update } = require('../utils/dbUtil');

const db = require('../models/database');

router.get('/', (req, res) => {
  const { populate } = qs.parse(req.query);

  const labels = db.get('labels').value();
  labels.forEach(label => {
    const memos =
      db
        .get('memos')
        .filter({ labelId: label.id })
        .value() || [];

    if (populate === false) {
      label.memos = memos.map(memo => memo.id);
    } else {
      label.memos = memos;
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
  const id = req.params.id;

  const data = db
    .get('labels')
    .find({ id })
    .value();

  if (data) {
    data.memos = db.get('memos').filter({ labelId: data.id }) || [];
    res.send(data);
  } else {
    res.status(500).send('invalid label id');
  }
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  db.get('labels')
    .find({ id })
    .assign(update({ title }))
    .write();

  const data = db
    .get('labels')
    .find({ id })
    .value();

  if (data && data.title === title) {
    res.send(data);
  } else {
    res.status(500).send('unable to update label');
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const data = db
    .get('labels')
    .remove({ id })
    .write();

  res.send(data);
});

/**
 * Add Memos to Label
 * @todo
 */

router.post('/:id/memos', (req, res) => {
  const id = req.param.id;
  const { memoIds } = req.body;

  if (memoIds && memoIds.length > 0) {
    memoIds.forEach(memoId => {
      db.get('memos')
        .find({ id: memoId })
        .assign({ labelId: id })
        .write();
    });
  }
  const data = db
    .get('labels')
    .find({ id })
    .value();

  if (data) {
    data.memos = db.get('memos').filter({ labelId: data.id }) || [];
    res.send(data);
  }
});

router.delete('/:id/memos', (req, res) => {
  const id = req.param.id;
  const { memoIds } = req.body;

  if (memoIds && memoIds.length > 0) {
    memoIds.forEach(memoId => {
      db.get('memos')
        .find({ id: memoId })
        .assign({ labelId: id })
        .write();
    });
  }
});

module.exports = router;
