const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Admin Key Check
function checkAdminKey(req, res, next) {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  next();
}

// सभी content लाओ
router.get('/', async (req, res) => {
  try {
    const { class: cls, subject, medium, contentType, chapter } = req.query;
    let filter = {};
    if (cls) filter.class = cls;
    if (subject) filter.subject = subject;
    if (medium) filter.medium = medium;
    if (contentType) filter.contentType = contentType;
    if (chapter) filter.chapter = chapter;

    const content = await Content.find(filter);
    res.json({ success: true, data: content });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// नया content add करो
router.post('/', checkAdminKey, async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.json({ success: true, data: content });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// content delete करो
router.delete('/:id', checkAdminKey, async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Search Route
router.get('/search', async (req, res) => {
  try {
    const { q, medium } = req.query;
    if (!q) return res.json({ success: true, data: [] });

    const results = await Content.find({
      medium: medium || 'hindi',
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { chapterName: { $regex: q, $options: 'i' } },
        { subject: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
      ]
    }).limit(20);

    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;