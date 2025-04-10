const express = require('express');
let router = express.Router();
const account = require('../model/account');
const connectDB = require('../database/mongoDB');
const authenticaToken= require('../middleware/authMiddleware');

connectDB();

router.get('/', async (req, res) => {
    try{
        const Account = await account.find();
        res.status(200).json({Account}); 
    }catch(error){
        res.status(500).json({message: "servre error", error: error.message});
    }   
});

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const Account = await account.findById(id);
        if(Account === null) {
            return res.status(404).json({message: "Account not found"});
        }else{
            res.status(200).json({Account}); 
        }
    }catch(error){
        res.status(500).json({message: "servre error", error: error.message});
    }   
});

router.get('/profile', async (req, res) => {
    res.json({ message: 'Chào mừng đến với trang profile!', user: req.user });
});

router.post('/', async (req, res) => {
    try{
        const {name, password, email, phone, address} = req.body;

        const exsisAccount = await account.findOne({email});
        if(exsisAccount) {
            return res.status(400).json({message: "Email is Used"});
        }

        const newAccount = new account({name, password, email, phone, address, role: 'user'});
        await newAccount.save();

        res.status(200).json({newAccount}); 
    }catch(error){
        res.status(500).json({message: "servre error", error: error.message});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const {name, email, phone, address} = req.body;

        const Account = await account.findById(id);
        if(Account === null) {
            return res.status(404).json({message: "Account not found"});
        }else{
            const exsisAccount = await account.findOne({email});
            if(exsisAccount && exsisAccount._id != id) {
                return res.status(400).json({message: "Email is Used"});
            }

            Account.name = name;
            Account.email = email;
            Account.phone = phone;
            Account.address = address;
            await Account.save();
            res.status(200).json({message: "Account updated"}); 
        }
    }catch(error){
        res.status(500).json({message: "servre error", error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const Account = await account.findById(id);
        if(Account === null) {
            return res.status(404).json({message: "Account not found"});
        }else{
            Account.isDeleted = !Account.isDeleted;
            await Account.save();
            res.status(200).json({message: "Account deleted"}); 
        }
    }catch(error){
        res.status(500).json({message: "servre error", error: error.message});
    }
});

module.exports = router;