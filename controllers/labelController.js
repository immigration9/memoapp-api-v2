const db = require('../models/database');
const { create, update } = require('../utils/dbUtil');
const httpStatus = require('http-status-codes');
const {
  getRelationByLabelId,
  getMemoByMemoId,
  getLabelByLabelId,
} = require('../utils/relationUtil');
const { createError, createResponse } = require('../utils/responseUtil');

module.exports = {
  getLabelsList: (req, res) => {
    const labels = db.get('labels').value();

    if (labels) {
      return res.status(httpStatus.OK).send(createResponse(labels));
    } else {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send(createError('Unable to retrieve data from server'));
    }
  },
  createLabel: (req, res) => {
    const { title } = req.body;

    if (title) {
      const data = db
        .get('labels')
        .push(create({ title }))
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
  getLabel: (req, res) => {
    const labelId = req.params.id;

    const label = getLabelByLabelId(labelId);

    if (label) {
      const labelToMemo = getRelationByLabelId(label.id);
      label.memoCount = (
        labelToMemo.map(item => getMemoByMemoId(item.memoId)) || []
      ).length;
      return res.status(httpStatus.OK).send(createResponse(label));
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(createError('invalid label id'));
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
    if (label) {
      return res.status(httpStatus.OK).send(createResponse(label));
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(createError('unable to find designated label'));
    }
  },
  deleteLabel: (req, res) => {
    const labelId = req.params.id;

    const label = getLabelByLabelId(labelId);

    if (!label) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(createError('unable to find designated label'));
    }

    db.get('labels')
      .remove({ id: labelId })
      .write();

    /**
     * Remove from relations table
     */
    db.get('labelsToMemos')
      .remove({ labelId })
      .write();

    return res.status(httpStatus.OK).send(createResponse(label));
  },
};
