const mongoose = require('mongoose');

//model
const authorSchema = new mongoose.Schema({
    name: {type: String, require: true},
    decriptions: {type: String, require: false},
    isdelete: {type: Boolean, default: false}
},{
    timestamps: true
});

//export
module.exports = mongoose.model('Author', authorSchema);
