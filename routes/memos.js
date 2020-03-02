const express = require('express');
const router = express.Router();

const memoController = require('../controllers/memoController');

router.post('/', memoController.createMemo);
router.get('/:id', memoController.getMemo);
router.put('/:id', memoController.updateMemo);
router.delete('/:id', memoController.deleteMemo);

module.exports = router;
