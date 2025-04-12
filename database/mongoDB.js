const mongoose = require('mongoose');

const LinkDB = 'mongodb://127.0.0.1:27017/test';

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