const { default: mongoose } = require("mongoose");

const chapterSchema = new mongoose.Schema({
    storyId: { type: mongoose.Schema.Types.String, ref: 'Story'},
    chapterNumber: { type: Number, required: true },
    title: { type: String, required: true },
    location: {type: String, require: false},
    content: [{ type: String, required: true }],
    
},{
    timestamps: true
});

module.exports = mongoose.model('Chapter', chapterSchema);