const express = require('express');
const router = express.Router();

const historyController = require('../controller/historyController');

router.get('/:id', historyController.getAllHistoryByUserId);
router.post('/', historyController.createHistory);
router.delete('/:id', historyController.deleteHistory);
router.put('/', historyController.updateTimeHistory);
router.post('/check', historyController.checkExsis);

module.exports = router;