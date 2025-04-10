const express = require('express');
const router = express.Router();

const commentController = require('../controller/commentController');

router.post('/', commentController.createComment);
router.get('/', commentController.getAllComment);
router.get('/:id', commentController.getCommentById);
router.put('/:id', commentController.editComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
