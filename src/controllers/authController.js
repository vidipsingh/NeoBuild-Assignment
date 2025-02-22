const jwt = require('jsonwebtoken');
const config = require('../config/environment');

const VALID_CREDENTIALS = {
  username: "naval.ravikant",
  password: "05111974"
};

const login = (req, res) => {
  const { username, password } = req.body;

  // Detailed logging
  console.log("Raw request body:", req.body);
  console.log("Received username:", username, "Type:", typeof username);
  console.log("Received password:", password, "Type:", typeof password);
  console.log("Expected username:", VALID_CREDENTIALS.username, "Type:", typeof VALID_CREDENTIALS.username);
  console.log("Expected password:", VALID_CREDENTIALS.password, "Type:", typeof VALID_CREDENTIALS.password);
  console.log("Username match:", username === VALID_CREDENTIALS.username);
  console.log("Password match:", password === VALID_CREDENTIALS.password);

  if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
    const token = jwt.sign({ username }, config.jwt.secret);
    res.json({ JWT: token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

module.exports = { login };