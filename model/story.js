const mongoose = require('mongoose');

//model
const storySchema = new mongoose.Schema({
    name: {type: String, required: true},
    subname: {type: String, required: false},
    author: {type: String, required: true},
    URLimage: {type: String, required: true},
    decriptions: {type: String, required: false},
    status: {type: String, enum: ['Đang tiến hành', 'Đã hoàn thành'], default: 'Đang tiến hành'},
    like: { type: Number, default: 0 },
    follow: { type: Number, default: 0 },
    seen: { type: Number, default: 0 },
    category:[{ type: mongoose.Schema.Types.String, ref: 'Category' }]
},{
    timestamps: true
});