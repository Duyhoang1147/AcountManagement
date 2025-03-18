const mongoose = require('mongoose');

//model
const authorSchema = new mongoose.Schema({
    name: {type: String, require: true},
    decriptions: {type: String, require: false},
},{
    timestamps: true
});

//export
moduke.exports = mongoose.model('author', authorSchema);
