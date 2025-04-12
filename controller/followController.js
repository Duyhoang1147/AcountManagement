const Follow = require('../model/follow');

const getAllFollowByUserId = async (req, res) => {
    try {
        const {id} = req.params;
        const follows = await Follow.find({userId: id})
        .populate('storyId');
        if(follows === null) {
            res.status(400).json({message: 'follow not found'});
        }
        res.status(200).json({follows});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

const createFollow = async (req, res) => {
    try {
        const {userid, storyid} = req.body;
        await Follow.create({
            userId: userid,
            storyId: storyid,
        })       
        res.status(200).json({message: 'follow created'});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

const deleteFollow = async (req, res) => {
    try {
        const {id} = req.params;
        await Follow.findByIdAndDelete(id);
        res.status(200).json({message: 'follow deleted'});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

module.exports = {
    getAllFollowByUserId,
    createFollow,
    deleteFollow,
}