const express = require('express');
const router = express.Router();

const followController = require('../controller/followController');

router.get('/:id', followController.getAllFollowByUserId);
router.post('/', followController.createFollow);
router.post('/check', followController.checkExsis);
router.delete('/:id', followController.deleteFollow);

module.exports = router;