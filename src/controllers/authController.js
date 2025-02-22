const jwt = require('jsonwebtoken');
const config = require('../config/environment');

const VALID_CREDENTIALS = {
  username: "naval.ravikant",
  password: "05111974"
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (username === VALID_CREDENTIALS.username && 
      password === VALID_CREDENTIALS.password) {
    const token = jwt.sign({ username }, config.jwt.secret);
    res.json({ JWT: token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

module.exports = { login };