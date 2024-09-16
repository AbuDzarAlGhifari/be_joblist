const express = require('express');
const AuthController = require('../controller/auth');

const router = express.Router();

// Register a new user
router.post('/register', AuthController.register);

// Login a user
router.post('/login', AuthController.login);

module.exports = router;
