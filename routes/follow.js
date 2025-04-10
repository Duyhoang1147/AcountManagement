const express = require('express');
const router = express.Router();

const followController = require('../controller/followController');

router.get('/', followController.getAllFollowByUserId);
router.post('/', followController.createFollow);
router.delete('/:id', followController.deleteFollow);

module.exports = router;