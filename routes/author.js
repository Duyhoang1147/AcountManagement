const express = require('express');
const router = express.Router();
const authorController = require('../controller/authorController');

router.get('/', authorController.getAllAuthors);
router.get('/:id', authorController.getAuthorbyId);
router.post('/', authorController.createAuthor);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
