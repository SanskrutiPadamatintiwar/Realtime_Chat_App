const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protectRoute = async (req, res, next) => {
    try {
        if (!req.cookies || !req.cookies.jwt) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log("Error in protectRoute middleware: ", err.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

module.exports = protectRoute;



