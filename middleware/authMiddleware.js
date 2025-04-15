const jwt = require('jsonwebtoken');
const Account = require('../model/account');

const SECRET_KEY = 'Yui123456';

const authenticaToken = (req, res, next) => {
    const token = req.cookies?.token; // Lấy token từ cookie
    console.log("authMiddleWare.js: start");
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("id: " + decoded.role); // Lấy userId từ token

        if(decoded.role === 'admin') {
            req.user = user; // Lưu thông tin user vào request
            next();
        }

        return res.status(403).json({ message: 'Forbidden' });
    } catch (error) {
        req.user = null; // Token không hợp lệ hoặc hết hạn
        next();
    }
}

module.exports = authenticaToken;


