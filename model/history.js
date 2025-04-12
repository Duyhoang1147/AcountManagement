const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.String, ref: 'Account', required: true},
    storyId: {type: mongoose.Schema.Types.String, ref: 'Story', required: true},
    access: {type: mongoose.Schema.Types.Date, default: Date.now},
},{
    timestamps: true
});

module.exports = mongoose.model('History', historySchema);