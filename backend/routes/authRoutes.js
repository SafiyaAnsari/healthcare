const express = require('express');
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  refreshAccessToken,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// auth entry points
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router.post('/refresh-token', refreshAccessToken);
router.get('/me', protect, getProfile);

module.exports = router;

