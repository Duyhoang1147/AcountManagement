const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.String, ref: 'Account', required: true},
    storyId: {type: mongoose.Schema.Types.String, ref: 'Story', required: true},
    
},{
    timestamps: true
});

module.exports = mongoose.model('Follow', followSchema);
