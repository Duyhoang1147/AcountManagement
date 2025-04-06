const express = require('express');
const multer = require('multer');
const router = express.Router();
const chapterController = require('../controller/chapterController');
const { route } = require('./Account');
const upload = multer({dest: 'data/uploads/'});

router.get('/:id', chapterController.getAllChapterbyIdStory)
router.get('/get_chapter/:id', chapterController.GetChapterbyId)
router.post('/', upload.array('images'), chapterController.createChapter);
router.delete('/:id', chapterController.removeChapter)

module.exports = router