const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
  const { body } = req;

  try {
    // Check if username already exists
    const [existingUser] = await UserModel.findUserByUsername(body.username);
    if (existingUser.length > 0) {
      return res.status(400).json({
        message: 'Username already in use',
      });
    }

    // Register the new user
    await UserModel.registerUser(body);
    res.json({
      message: 'User registration successful',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

// User login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const [user] = await UserModel.findUserByUsername(username);
    if (user.length === 0) {
      return res.status(400).json({
        message: 'Invalid username or password',
      });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Invalid username or password',
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user[0].id,
        username: user[0].username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

// Token verification (for protected routes)
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
};
