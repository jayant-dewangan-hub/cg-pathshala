const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// MongoDB Connect
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
   await mongoose.connect("mongodb+srv://cgpathshala:Jay12345@cluster0.st0k5g1.mongodb.net/cgpathshala?retryWrites=true&w=majority");

    console.log('✅ MongoDB Connected!');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.log('❌ DB Connection Error:', err);
  }
};

startServer();
console.log("ENV CHECK:", process.env.MONGODB_URI);
console.log("URI CHECK:", process.env.MONGODB_URI);
const jwt = require('jsonwebtoken');

const ADMIN_USER = "admin";
const ADMIN_PASS = "123456";
const SECRET = "myjwtsecret";
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
// LOGIN API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' });

    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});