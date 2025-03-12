const mongoose = require('mongoose');

const LinkDB = 'mongodb://localhost:27017/test';

const conectDB = async () => {
  try {
    await mongoose.connect(LinkDB);
    console.log('MongoDB is connected');
  } catch (error) {
    console.log('MongoDB is not connected');
    console.log(error);
  }
}

module.exports = conectDB;