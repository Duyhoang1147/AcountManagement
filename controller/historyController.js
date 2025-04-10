const History = require('../model/history');

const getAllHistoryByUserId = async (req, res) => {
    try {
        const {userid} = req.params
        const histories = await History.find({userId: userid});
        if(histories === null) {
            res.status(400).json({message: 'history not found'});
        }
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

const deleteHistory = async (req, res) => {
    try {
        const {id} = req.params;
        await History.findByIdAndDelete(id);
        res.status(200).json({message: 'history deleted'});
    } catch(err) {
        res.status(500).json({message: 'Internal server error: ' + err});
    }
}

module.exports = {
    getAllHistoryByUserId,
    createHistory,
    deleteHistory,
}