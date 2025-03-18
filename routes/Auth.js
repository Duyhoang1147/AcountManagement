//module
const express = require('express');
const account = require('../model/account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//method
const connectDB = require('../database/mongoDB');
const checkAccount = require('../utils/checkAccount').checkAccount;
let router = express.Router();

//init
connectDB();

//variable
const SECRET_KEY = 'Yui123456';

router.post('/login', async (req, res)=> {
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

router.post('/register', async (req, res) => {
    try{
        const {name, password, email} = req.body;

        const exsisAccount = await account.findOne({email});
        if(exsisAccount) {
            return res.status(400).json({message: "Email is Used"});
        }

        const newAccount = new account({name, password, email});
        await newAccount.save();

        res.status(200).json({newAccount}); 
    }catch(error){
        res.status(500).json({message: "servre error", error: error.message});
    }
});

router.get('/profile', authenticaToken, async (req, res) => {
    try {
        // Lấy thông tin user từ database dựa trên ID trong JWT
        const user = await account.findById(req.user.id).select("name email role");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user }); // Trả về dữ liệu user cho frontend
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router