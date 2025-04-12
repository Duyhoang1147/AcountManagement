const History = require('../model/history');

const getAllHistoryByUserId = async (req, res) => {
    try {
        const {id} = req.params
        const histories = await History.find({userId: id})
        .populate('storyId');
        
        if(histories === null) {
            res.status(400).json({message: 'history not found'});
        }
        histories.sort((a, b) => {
            return b.access - a.access;
        })  // Sort by access time in descending order

        res.status(200).json({histories});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

const createHistory = async (req, res) => {
    try {
        const {userid, storyid} = req.body;
        await History.create({
            userId: userid,
            storyId: storyid,
        })
        res.status(200).json({message: 'history created'});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

const updateTimeHistory = async (req, res) => {
    try {
        const {userid, storyid} = req.body;
        const history = await History.findOne({userId: userid, storyId: storyid});

        if(!history) {
            return res.status(404).json({message: 'history not found'});
        }

        history.access = Date.now();
        await history.save();

        res.status(200).json({ message: "Access time updated" });
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

const deleteHistory = async (req, res) => {
    try {
        const {id} = req.params;
        await History.findByIdAndDelete(id);
        res.status(200).json({message: 'history deleted'});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

const checkExsis = async (req, res) => {
    try {
        const {userid, storyid} = req.body;
        const history = await History.findOne({userId: userid, storyId: storyid});
        if(history) {
            res.status(200).json({message: 'history exist'});
        } else {
            res.status(400).json({message: 'history not exist'});
        }
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

module.exports = {
    getAllHistoryByUserId,
    createHistory,
    deleteHistory,
    checkExsis,
    updateTimeHistory,
}