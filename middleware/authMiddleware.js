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

const authorizeRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Lấy user từ database dựa trên `req.user.id`
            const user = await account.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Kiểm tra quyền
            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: "Forbidden: You do not have permission!" });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    };
};

module.exports = {
    authenticaToken,
    authorizeRole
}
