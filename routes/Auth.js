//module
const express = require('express');
const account = require('../model/account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticaToken = require('../middleware/authMiddleware');

//method
const connectDB = require('../database/mongoDB');
let router = express.Router();

//init
connectDB();

//variable
const SECRET_KEY = 'Yui123456';

router.post('/login', async (req, res)=> {
    try{
        const {email, password} = req.body; 
        const user = await account.findOne({ email });
        console.log("Auth.js: Login");
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Password not correct"});
        }

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, SECRET_KEY, {expiresIn: '1h'});
        console.log("Auth.js: Login: Token: " + token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000 
        });
        res.status(200).json({ message: "login successful"});
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

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    console.log('Logout successful');
    res.status(200).json({message: "Logout successful"});
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