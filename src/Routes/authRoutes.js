const express = require('express');
const { register, login, logout, getUserData,getUserById,updateUser,uploadProfileImage } = require('../controller/authController');
const { protect } = require('../middleware/authMiddleware'); // Ensure this path is correct
const {upload} =require('../storage/profilestorage')
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user', protect, getUserData);
router.get('/user/:id',getUserById );
router.put('/user/:id', upload.single('profile'), updateUser);

// router.put('/user/profile/:id', upload.single('file'), uploadProfileImage);
module.exports = router;
