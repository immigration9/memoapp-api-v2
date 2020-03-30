const express = require('express');
const router = express.Router();

const memoController = require('../controllers/memoController');
const relationController = require('../controllers/relationController');

router.get('/', memoController.getMemosList);
router.post('/', memoController.createMemo);
router.get('/:id', memoController.getMemo);
router.put('/:id', memoController.updateMemo);
router.delete('/:id', memoController.deleteMemo);

router.get('/:id/labels', relationController.getLabelsByMemo);
router.post('/:id/labels', relationController.addLabelsToMemo);
router.delete('/:id/labels', relationController.deleteLabelsFromMemo);

module.exports = router;
