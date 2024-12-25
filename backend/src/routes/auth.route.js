const express = require('express');
const { signup, login, logout, updateProfile,checkAuth } = require('../controllers/auth.controller'); // Ensure updateProfile is imported
const  protectRoute  = require('../middleware/auth.middleware');
const router = express.Router();

router.post("/signup", signup);
router.post('/login', login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile); // Ensure updateProfile is used correctly

router.get("/check",protectRoute,checkAuth)

module.exports = router;