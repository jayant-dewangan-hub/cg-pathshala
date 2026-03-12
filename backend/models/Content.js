const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  class: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  medium: {
    type: String,
    enum: ['hindi', 'english'],
    required: true
  },
  chapter: {
    type: Number,
    required: true
  },
  chapterName: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    enum: ['notes', 'pdf', 'pyq', 'mcq', 'video', 'imp'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  videoUrl: {
    type: String
  },
  pdfUrl: {
    type: String
  },
  mcqOptions: [{
    option: String,
    isCorrect: Boolean
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Content', contentSchema);