const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './backend/.env' });

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch((err) => console.log('❌ Error:', err));

const contentRoutes = require('./routes/content');
app.use('/api/content', contentRoutes);

app.get('/', (req, res) => {
  res.json({ message: '🎉 CG Pathshala Server Running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});