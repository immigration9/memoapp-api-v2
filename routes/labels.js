const express = require('express');
const router = express.Router();

const labelController = require('../controllers/labelController');
const relationController = require('../controllers/relationController');

router.get('/', labelController.getLabelsList);
router.post('/', labelController.createLabel);
router.get('/:id', labelController.getLabel);
router.put('/:id', labelController.updateLabel);
router.delete('/:id', labelController.deleteLabel);

router.get('/:id/memos', relationController.getMemosByLabel);
router.post('/:id/memos', relationController.addMemosToLabel);
router.delete('/:id/memos', relationController.deleteMemosFromLabel);

module.exports = router;
