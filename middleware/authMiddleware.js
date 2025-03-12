const jwt = require('jsonwebtoken');

const SECRET_KEY = 'Yui123456';

const authenticaToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if(!token) {
        return res.status(400).json({ message: "You are not logged in!"});
    }
    
    try{
        console.log(token);
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }catch{
        return res.status(400).json({ message: "Token is invalid or expired!"});
    }
}

module.exports = authenticaToken