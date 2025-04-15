const { default: mongoose } = require("mongoose");

const SchemaCategory = new mongoose.Schema({
    name: {type: String, required: true},
    isdeleted: {type: Boolean, default: false},
},{
    timestamps: true
});

module.exports = mongoose.model('Category', SchemaCategory);