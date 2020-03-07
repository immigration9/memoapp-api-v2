const { create, update } = require('../utils/dbUtil');
const { getMemoByMemoId } = require('../utils/relationUtil');
const httpStatus = require('http-status-codes');
const db = require('../models/database');
const { createError, createResponse } = require('../utils/responseUtil');

module.exports = {
  getMemosList: (req, res) => {
    const memos = db.get('memos').value();

    if (memos) {
      return res.status(httpStatus.OK).send(createResponse(memos));
    } else {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(
          createError(
            'Unable to retrieve data from server',
            httpStatus.INTERNAL_SERVER_ERROR
          )
        );
    }
  },
  createMemo: (req, res) => {
    const { title, content } = req.body;

    if (title) {
      const data = db
        .get('memos')
        .push(create({ title, content }))
        .write();

      return res
        .status(httpStatus.OK)
        .send(createResponse(data[data.length - 1]));
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(createError('must provide a valid title'));
    }
  },
  getMemo: (req, res) => {
    const memoId = req.params.id;

    const memo = getMemoByMemoId(memoId);

    if (memo) {
      return res.status(httpStatus.OK).send(createResponse(memo));
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(createError('invalid memo id'));
    }
  },
  updateMemo: (req, res) => {
    const memoId = req.params.id;
    const { title, content } = req.body;

    db.get('memos')
      .find({ id: memoId })
      .assign(update({ title, content }))
      .write();

    const memo = getMemoByMemoId(memoId);

    if (memo) {
      return res.status(httpStatus.OK).send(createResponse(memo));
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(createError('unable to find designated memo'));
    }
  },
  deleteMemo: (req, res) => {
    const memoId = req.params.id;

    const memo = getMemoByMemoId(memoId);

    if (!memo) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(createError('unable to find designated memo'));
    }

    db.get('memos')
      .remove({ id: memoId })
      .write();

    /**
     * Delete all relations
     */
    db.get('labelsToMemos')
      .remove({ memoId })
      .write();

    return res.status(httpStatus.OK).send(createResponse(memo));
  },
};
