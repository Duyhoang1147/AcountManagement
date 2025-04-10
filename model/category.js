const { default: mongoose } = require("mongoose");

const SchemaCategory = new mongoose.Schema({
    name: {type: String, required: true},
},{
    timestamps: true
});

module.exports = mongoose.model('Category', SchemaCategory);