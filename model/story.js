const mongoose = require('mongoose');

//model
const storySchema = new mongoose.Schema({
    name: {type: String, required: true},
    subname: {type: String, required: false},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
    poster: {type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: false},
    category:[{ type: mongoose.Schema.Types.String, ref: 'Category' }],
    URLimage: {type: String, required: true},
    decriptions: {type: String, required: false},
    status: {type: String, enum: ['Đang tiến hành', 'Đã hoàn thành'], default: 'Đang tiến hành'},
    like: { type: Number, default: 0 },
    follow: { type: Number, default: 0 },
    seen: { type: Number, default: 0 },
    chapter:[{ type: mongoose.Schema.Types.String, ref: 'Chapter'}],
    isdelete: {type: Boolean, default: false},
    location: {type: String, required: false},
},{
    timestamps: true
});

module.exports = mongoose.model('Story', storySchema);