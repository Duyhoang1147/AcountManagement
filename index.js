const express = require('express');
const account = require('./model/account');
const conectDB = require('./database/mongoDB');

const app = express();

const PORT = 8080;

conectDB();

app.use(express.json());

app.get('/account', async (req, res) => {
    try{
        const Account = await account.find();
        res.status(200).json({Account}); 
    }catch(error){
        res.status(500).json({message: "servre error", error: error.message});
    }   
});

app.get('/account/:id', async (req, res) => {
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

app.post('/account', async (req, res) => {
    try{
        const {name, password, email, phone, address} = req.body;

        const exsisAccount = await account.findOne({email});
        if(exsisAccount) {
            return res.status(400).json({message: "Email is Used"});
        }

        const newAccount = new account({name, password, email, phone, address});
        await newAccount.save();

        res.status(200).json({newAccount}); 
    }catch(error){
        res.status(500).json({message: "servre error", error: error.message});
    }
});

app.put('/account/:id', async (req, res) => {
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
            res.status(200).json({Account}); 
        }
    }catch(error){
        res.status(500).json({message: "servre error", error: error.message});
    }
});

app.delete('/account/:id', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});