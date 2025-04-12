const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    storyId: {type: mongoose.Schema.Types.String, ref: 'Story', required: true},
    userId: {type: mongoose.Schema.Types.String, ref: 'account', required: true},
    content: {type: String, required: true},
    parentComment: {type: mongoose.Schema.Types.String, ref: 'Comment', default: null},
},{
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);