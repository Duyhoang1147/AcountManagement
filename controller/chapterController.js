const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');

const Chapter = require('../model/chapter');
const Story = require('../model/story');
const {formatFileName} = require('../utils/stringAction');

const getAllChapterbyIdStory = async (req, res) => {
    try {
        const {storyid} = req.body;
        const chapters = await Chapter.find({_id: storyid});

        if(chapters === null) {
            return res.status(400).json({message: 'Chapter not found'});
        }

        res.status(200).json(chapters);
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err})
    }
}

const GetChapterbyId = async (req, res) => {
    try {
        const {id} = req.params
        const chapter = await Chapter.findById(id);

        if(chapter === null) {
            return res.status(400).json({message: 'Chapter not found'});
        }

        res.status(200).json({chapter})
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err})
    }
}

const createChapter = async (req, res) => {
    try {
        const {id} = req.params;
        const {storyid, chapterNumber, title} = req.body;
        const story = await Story.findById(storyid);

        if(story === null) {
            return res.status(400).json({message: 'story not found'});
        }

        const folderPath = path.join(story.location, chapterNumber)

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({message: 'No files were uploaded.'});
        }

        const chapterNew = await Chapter.create({
            storyId: storyid,
            chapterNumber: chapterNumber,
            title: title,
            location: folderPath
        });

        if(!fs.existsSync(folderPath)) {
            fs.mkdirpSync(folderPath);
        } else {
            res.status(400).json({message: 'folder have exists'});
        }

        const fileUrls = [];
        for(let file of req.files) {
            const filePath = path.join(folderPath, file.originalname)
            fs.moveSync(file.path, filePath);
            fileUrls.push(`${formatFileName(story.name)}/${chapterNumber}/${file.originalname}`) 
        }
        await chapterNew.updateOne({ content: fileUrls });
        await Story.findByIdAndUpdate(storyid,
        { $push: { chapter: (await chapterNew)._id} },
        { new: true });

        res.status(200).json({message: 'create chapter sucess'});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

const removeChapter = async (req, res) => {
    try {
        const {id} = req.params
        const chapter = await Chapter.findById(id);
        if(chapter === null) {
            res.status(400).json({message: 'chapter not found'});
        }
        
        const story = await Story.findById(chapter.storyId);
        if(story === null) {
            res.status(400).json({message: 'remove chapter failed'});
        }

        await Story.updateOne(
            {_id: story._id},
            {$pull: {chapter: id}},
        )

        fs.remove(chapter.location, (err) => {
            if(err) {return res.status(400).json({message: 'remove chapter failed'});}
        })

        await chapter.deleteOne();
        
        res.status(200).json({message: 'remove chapter sucess'});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err})
    }
}

module.exports = {
    getAllChapterbyIdStory,
    GetChapterbyId,
    createChapter,
    removeChapter
}
