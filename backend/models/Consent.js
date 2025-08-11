const mongoose = require('mongoose');

const consentSchema = new mongoose.Schema({
  userId: String,
  consentType: String, // e.g., "Marketing Emails"
  status: { type: String, enum: ['granted', 'revoked'], default: 'granted' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consent', consentSchema);
