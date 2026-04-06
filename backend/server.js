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
mongoose.connect("mongodb+srv://cgpathshala:TNAYAJ1807@cluster0.st0k5g1.mongodb.net/cgpathshala?appName=Cluster0")
.then(() => console.log('✅ MongoDB Connected!'))
.catch((err) => console.log('❌ Error:', err));

// Routes
const contentRoutes = require('./routes/content');
app.use('/api/content', contentRoutes);

// Test Route
app.get('/', (req, res) => {
  res.json({ message: '🎉 CG Pathshala Server Running!' });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
console.log("ENV CHECK:", process.env.MONGODB_URI);
console.log("URI CHECK:", process.env.MONGODB_URI);