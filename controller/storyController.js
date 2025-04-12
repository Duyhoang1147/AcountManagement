const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

const Story = require('../model/story');
const {formatFileName} = require('../utils/stringAction');
const Category = require('../model/category');


const getAllStory = async (req, res) => {
    try {
        const stories = await Story.find({isdelete: false})
        .populate('category')
        .populate('author')
        .populate('chapter').select('-content')
        res.status(200).json(stories);
    } catch(error) {
        res.status(500).json({message: 'Internal server error:' + error});
    }
}

const getStorybyId = async (req, res) => {
    try {
        const {id} = req.params
        const story = await Story.findOne({_id: id, isdelete: false})
        .populate('category')
        .populate('author')
        .populate('chapter');

        if(story === null) {
            res.status(400).json({message: 'Story not found'});
        }
        res.status(200).json({story});
    } catch(error) {
        res.status(500).json({message: 'Internal server error: ' + error});
    }
}

const getStrorybyCategory = async (req, res) => {
    try {
        const {id} = req.params
        const stories = await Story.find({category: id, isdelete: false})
        .populate('category', '_id name')
        .populate('author', '_id name')

        if(stories === null) {
            res.status(400).json({message: 'Story not found'});
        }

        res.status(200).json({stories});
    } catch(error) {
        res.status(500).json({message: 'Internal server error: ' + error});
    }
}


const createStory = async (req, res) => {
    try {
        // khai bao bien
        const {name, subname, authorid, posterid, decriptions, chapter, category} = req.body;
        const folderpath = path.join(__dirname, '..', 'data', formatFileName(name));
        const filePathImage = path.posix.join('data', formatFileName(name), req.file.originalname);
        const filePath = path.posix.join(folderpath, req.file.originalname);
        
        //kiem tra du lieu dau vao
        const checkCategory = await Category.find({'_id': {$in: category}}).select('_id');
        const categories = checkCategory.map(item => item._id.toString());
        if(categories.length !== category.length) {
            res.status(400).json({message: 'Category not found'});
        }
        //tao truyen moi
        await Story.create({
            name: name,
            subname: subname,
            author: authorid,
            poster: posterid,
            decriptions: decriptions,
            chapter: chapter,
            location: folderpath,
            category: categories,
            URLimage: filePathImage,
        });

        //tao thu muc luu truyen
        if(!fs.existsSync(folderpath)) {
            fs.mkdirpSync(folderpath);
        } else {
            res.status(400).json({message: 'Story already exists'});
        }
        
        //chuyen anh tu temp vao thu muc truyen
        fs.moveSync(req.file.path, filePath, (err) => {
            if(err) {
                return res.status(400).json({message: 'Error when rename file'});
            }
        });

        res.status(200).json({message: 'Story created'});
    } catch(error) {
        res.status(500).json({message: 'Internal server error 3: ' + error});
    }
}

const updateStory = async (req, res) => {
    try {
        //khai bao bien
        const {id} = req.params;
        const {name, subname, authorid, decriptions, category} = req.body;
        const folderpath = story.location;
        const folderpathnew = path.join(__dirname, '..', 'data', formatFileName(name));
        const oldfilePath = story.URLimage;
        const newfilePath = path.posix.join(folderpath, req.file.originalname);
        const story = await Story.findById(id);

        //kiem tra
        if(story === null) {
            res.status(400).json({message: 'Story not found'});
        }

        const checkCategory = await Category.find({'_id': {$in: category}}).select('_id');
        const categories = checkCategory.map(item => item._id.toString());
        if(categories.length !== category.length) {
            res.status(400).json({message: 'Category not found'});
        }

        if(name === undefined) name = story.name;
        if(subname === undefined) subname = story.subname;
        if(authorid === undefined) authorid = story.authorid;
        if(decriptions === undefined) decriptions = story.decriptions;
        if(category === undefined) category = story.category;

        //cap nhat lai URLimage trong folder
        fs.moveSync(oldfilePath, newfilePath, {overwrite: true}, (error) => {
            if(error) {
               return res.status(400).json({message: 'Error when rename folder'});
            }
        });
        //doi ten thu muc neu ten truyen thay doi
        if(folderpath != folderpathnew) {
            fs.renameSync(folderpath, folderpathnew);
            folderpath = folderpathnew;
        }
         
        await Story.findByIdAndUpdate(id, {
            name: name,
            subname: subname, 
            authorid: authorid,
            decriptions: decriptions,
            chapter: chapter,
            location: folderpath,
            category: categories,
        });

        res.status(200).json({message: 'Story updated'});
    } catch(error) {
        res.status(500).json({message: 'Internal server error 4'});
    }
}

const deleteStory = async (req, res) => {
    try {
        const {id} = req.params;
        const story = await Story.findById(id);
        if(story === null) {
            res.status(400).json({message: 'Story not found'});
        }
        
        story.isdelete = !story.isdelete;
        await story.save();
        res.status(200).json({message: 'Story deleted'});
    } catch {
        res.status(500).json({message: 'Internal server error'});
    }
}

const removeStory = async (req, res) => {
    try {
        const id = req.params.id;
        const story = await Story.findById(id);
        if(story === null) {
            res.status(400).json({message: 'Story not found'});
        }

        await story.deleteOne();

        fs.removeSync(story.location)

        res.status(200).json({message: 'Story deleted'});
    } catch (err) {
        res.status(500).json({message: 'Internal server error 6: ' + err});
    }
}

module.exports = {
    getAllStory,
    getStorybyId,
    getStrorybyCategory,
    createStory,
    updateStory,
    deleteStory,
    removeStory
}
