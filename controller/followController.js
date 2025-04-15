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
        const storyId = req.params.id;
        const { userid } = req.body;

        if (!storyId || !userid) {
            return res.status(400).json({ message: 'Missing storyId or userId' });
        }

        const result = await Follow.findOneAndDelete({
            storyId: storyId,
            userId: userid
        });

        if (!result) {
            return res.status(404).json({ message: 'Follow not found' });
        }

        return res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (error) {
        console.error('Delete follow error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const checkExsis = async (req, res) => {
    try {
        const {userid, storyid} = req.body;
        const follow = await Follow.findOne({userId: userid, storyId: storyid});
        if(!follow) {
            res.status(400).json({message: 'follow not found'});
        } else {
            res.status(200).json({message: 'follow found'});
        }
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

module.exports = {
    getAllFollowByUserId,
    createFollow,
    deleteFollow,
    checkExsis,
}