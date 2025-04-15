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
            return res.status(400).json({error: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({error: "Password not correct"});
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


//lay thong tin nguoi dung dang nhap
router.get('/me', async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({ error: 'Unauthorized 1' });

        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await account.findById(decoded.id).select("-password");
        if(user === null) return res.status(401).json({error: 'Unauthorized 2'});

        res.json({user});
    } catch(erorr) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token or token expired' });
    }
})

module.exports = router