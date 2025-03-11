const express = require('express');
const account = require('../model/account');
const connectDB = require('../database/mongoDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let router = express.Router();
connectDB();

const SECRET_KEY = 'Yui123456';

router.get('/', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await account.findOne({ email });

        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Password not correct"});
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {expiresIn: '1h'});
        res.status(200).json({ message: "login successful", token, user});
    }catch(error){
        res.status(500).json({message: "servre error", error: error.message});
    }
});