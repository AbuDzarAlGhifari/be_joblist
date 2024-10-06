const dbPool = require('../config/database');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (body) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const SQLQuery = `INSERT INTO users (username, email, password, confpassword) VALUES (?, ?, ?, ?)`;
  const values = [body.username, body.email, hashedPassword, body.confpassword];
  return dbPool.execute(SQLQuery, values);
};

// Find user by username
const findUserByUsername = (username) => {
  const SQLQuery = 'SELECT * FROM users WHERE username = ?';
  return dbPool.execute(SQLQuery, [username]);
};

module.exports = {
  registerUser,
  findUserByUsername,
};
