const express = require('express');
const router = express.Router();
const qs = require('querystring');

const { create, update } = require('../utils/dbUtil');

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
  const id = req.params.id;

  const data = db
    .get('memos')
    .find({ id })
    .value();

  if (data) {
    res.send(data);
  } else {
    res.status(500).send('invalid memo id');
  }
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  db.get('memos')
    .find({ id })
    .assign(update({ title, content }))
    .write();

  const data = db
    .get('memos')
    .find({ id })
    .value();

  if (data) {
    res.send(data);
  } else {
    res.status(500).send('unable to update memo');
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const data = db
    .get('memos')
    .remove({ id })
    .write();

  res.send(data);
});
