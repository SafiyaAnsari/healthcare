const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const generateToken = require('../utils/generateToken');
const { handleServerError } = require('../utils/controllerHelpers');

function buildUserPayload(user, accessToken) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: accessToken,
  };
}

async function createAndStoreRefreshToken(userId) {
  const tokenValue = generateToken({ _id: userId, role: 'refresh' });
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const refreshToken = await RefreshToken.create({
    user: userId,
    token: tokenValue,
    expiresAt,
  });

  return refreshToken;
}

function setRefreshCookie(res, tokenValue) {
  res.cookie('refreshToken', tokenValue, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

// create a new user account
async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, role });
    const accessToken = generateToken(user);
    const refreshToken = await createAndStoreRefreshToken(user._id);
    setRefreshCookie(res, refreshToken.token);

    return res.status(201).json(buildUserPayload(user, accessToken));
  } catch (error) {
    return handleServerError(res, 'Register user', error);
  }
}

// authenticate an existing user
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await user.matchPassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateToken(user);
    const refreshToken = await createAndStoreRefreshToken(user._id);
    setRefreshCookie(res, refreshToken.token);

    return res.json(buildUserPayload(user, accessToken));
  } catch (error) {
    return handleServerError(res, 'Login user', error);
  }
}

// show details for the current user
async function getProfile(req, res) {
  try {
    return res.json(req.user);
  } catch (error) {
    return handleServerError(res, 'Get profile', error);
  }
}

// clear refresh token cookie and record
async function logoutUser(req, res) {
  try {
    const tokenValue = req.cookies.refreshToken;

    if (tokenValue) {
      await RefreshToken.findOneAndDelete({ token: tokenValue });
    }

    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out' });
  } catch (error) {
    return handleServerError(res, 'Logout user', error);
  }
}

// exchange refresh token for new access token
async function refreshAccessToken(req, res) {
  try {
    const tokenValue = req.cookies.refreshToken;

    if (!tokenValue) {
      return res.status(401).json({ message: 'No refresh token' });
    }

    const storedToken = await RefreshToken.findOne({ token: tokenValue }).populate('user');

    if (!storedToken || storedToken.expiresAt < new Date() || !storedToken.user) {
      return res.status(401).json({ message: 'Refresh token invalid' });
    }

    const user = storedToken.user;
    const accessToken = generateToken(user);

    return res.json(buildUserPayload(user, accessToken));
  } catch (error) {
    return handleServerError(res, 'Refresh token', error);
  }
}

module.exports = { registerUser, loginUser, getProfile, logoutUser, refreshAccessToken };

