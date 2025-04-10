const express = require('express');
const multer = require('multer');
const router = express.Router();
const storyController = require('../controller/storyController');
const upload = multer({dest: 'data/uploads/'});

router.get('/', storyController.getAllStory);
router.get('/:id', storyController.getStorybyId);
router.post('/', upload.single('image'), storyController.createStory);
router.put('/:id', storyController.updateStory);
router.delete('/:id', storyController.deleteStory);
router.delete('/remove/:id', storyController.removeStory);

module.exports = router;