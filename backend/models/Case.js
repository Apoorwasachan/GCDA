const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Case = mongoose.model('Case', caseSchema);
module.exports = Case;
