const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*' // Production mein specific domains daalo
}));
app.use(express.json());

// ===== ADMIN KEY BYPASS - WORKING VERSION =====
app.use((req, res, next) => {
  if (req.path.startsWith('/api/content')) {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey === 'Jay2026Secret') {
      console.log('🔑 Admin bypass successful!');
      req.user = { username: 'admin' };
      return next();
    }
  }
  next();
});

// ========== MONGODB SCHEMAS ==========
const contentSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  category: String,
  createdAt: { type: Date, default: Date.now }
});

const Content = mongoose.model('Content', contentSchema);

// ========== JWT AUTH MIDDLEWARE ==========
const ADMIN_USER = "admin";
const ADMIN_PASS = "123456";
const SECRET = "myjwtsecret";

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
// ===== ADMIN KEY BYPASS - WORKING VERSION =====
app.use((req, res, next) => {
  if (req.path.startsWith('/api/content')) {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey === 'Jay2026Secret') {
      console.log('🔑 Admin bypass successful!');
      req.user = { username: 'admin' };
      return next();
    }
  }
  next();
});
// ========== LOGIN API ==========
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '24h' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// ========== ADMIN PANEL APIs ==========
app.get('/api/content', verifyToken, async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 });
    res.json({ success: true, contents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/content', verifyToken, async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.json({ success: true, message: 'Content added successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/content/:id', verifyToken, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/content/:id', verifyToken, async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Content deleted!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== PUBLIC API (App ke liye) ==========
app.get('/api/public-content', async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, contents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// MongoDB Connect
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await mongoose.connect("mongodb+srv://cgpathshala:Jay12345@cluster0.st0k5g1.mongodb.net/cgpathshala?retryWrites=true&w=majority");
    console.log('✅ MongoDB Connected!');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 APIs ready: /api/login, /api/content, /api/public-content`);
    });
  } catch (err) {
    console.log('❌ DB Connection Error:', err);
  }
};

startServer();
