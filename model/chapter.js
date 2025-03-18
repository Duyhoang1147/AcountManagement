const { default: mongoose } = require("mongoose");

const chapterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    storyId: { type: String, ref: 'Story', required: true },
    chapterNumber: { type: Number, required: true },
    title: { type: String, required: true },
    content: [{ type: String, required: true }],
    
},{
    timestamps: true
});

module.exports = mongoose.model('Chapter', chapterSchema);