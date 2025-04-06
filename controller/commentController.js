const Comment = require('../model/comment');

const createComment = async (req, res) => {
    try {
        const {storyid, userid, content} = req.body;
        await Comment.create({
            storyId: storyid,
            userId: userid,
            content: content,
        })

        res.status(200).json({message: 'comment created'});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

const getAllComment = async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.status(200).json(comments);
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

const getCommentById = async (req, res) => {
    try {
        const {id} = req.params;
        const comment = await Comment.findById(id);
        if(comment === null) {
            res.status(400).json({message: 'comment not found'});
        }
        res.status(200).json(comment);
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

const editComment = async (req, res) => {
    try {
        const {id} = req.params;
        const {content} = req.body;
        await Comment.findByIdAndUpdate(
            id,
            {content: content,}, 
            {new: true},
        );

        res.status(200).json({message: 'comment updated'});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

const deleteComment = async (req, res) => {
    try {
        const {id} = req.params;
        const comment = await Comment.findById(id);
        if(comment === null) {
            res.status(400).json({message: 'comment not found'});
        }

        await comment.deleteOne();
        res.status(200).json({message: 'comment deleted'});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

module.exports = {
    createComment,
    getAllComment,
    getCommentById,
    editComment,
    deleteComment,

}