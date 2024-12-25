const generateToken = require('../lib/utils');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const cloudinary = require('../lib/cloudinary');

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: hashedPassword });

        await newUser.save();
        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic || null,
        });
    } catch (err) {
        console.error("Error in signup controller:", err.message);
        res.status(500).json({ message: "Internal Server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic || null,
        });
    } catch (err) {
        console.error("Error in login controller:", err.message);
        res.status(500).json({ message: "Internal Server error" });
    }
};

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Error in logout controller:", err.message);
        res.status(500).json({ message: "Internal Server error" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error in updateProfile controller:", err.message);
        res.status(500).json({ message: "Internal Server error" });
    }
};

const checkAuth=(req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(err){
        console.error("Error in checkAuth controller:", err.message);
        res.status(500).json({ message: "Internal Server error" });
    }
}

module.exports = {
    signup,
    login,
    logout,
    updateProfile, 
    checkAuth
};
