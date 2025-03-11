const jwt = require('jsonwebtoken');

const SECRET_KEY = 'Yui123456';

const authenticaToken = (req, res, next) => {
    const token = req.header('Authorization')?.split('')[1];

    if(!token) {
        return res.status(400).json({ message: "user not login"});
    }

    try{

    }catch{
        
    }
}