const jwt = require('jsonwebtoken');

const SECRET_KEY = 'Yui123456';

const authenticaToken = (req, res, next) => {
    const token = req.cookies?.token; // Lấy token từ cookie
    console.log("authMiddleWare.js: start");
    if (!token) {
        console.log("condition");
        req.user = null; // Không có token, không đăng nhập
        return next();
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Lưu thông tin user vào request
        console.log("true");
        next();
    } catch (error) {
        console.log("false");
        req.user = null; // Token không hợp lệ hoặc hết hạn
        next();
    }
}

module.exports = authenticaToken;


