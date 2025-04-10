const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//model
const accountSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: false},
  address: {type: String, required: false},
  role: {type: String, required: true, enum: ['admin', 'user', 'publisher'], default: 'user'},
  isDeleted: {type: Boolean, default: false}
},{
  timestamps: true
});

//middleware
accountSchema.pre('save', async function async (next) {
  if(!this.isModified('password')){ return next(); }

  try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();

  }catch(error){ return next(error); }
});

//method
accountSchema.methods.comparePassword = async function(candidatePassword) {
  try{
    return await bcrypt.compare(candidatePassword, this.password);
    
  }catch(error){ return false; }
}

//export
module.exports = mongoose.model('account', accountSchema);