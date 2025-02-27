const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function authMiddleware(req, res, next) {
    const token = req.headers('Authorization')?.replace('Bearer', '').trim();

    if(!token) return res.status(401).json({message: 'Access Denied'});

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        const user = User.findById(verified.id);

        if(!user) throw new Error("User Not Found");

        next();
    } catch (error) {
        res.status(400).json({message: 'Invalid Token'});
    }
}

module.exports = {
    authMiddleware
}