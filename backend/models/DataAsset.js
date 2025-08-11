const mongoose = require('mongoose');

const dataAssetSchema = new mongoose.Schema({
  name: String,
  category: { type: String, enum: ['PII', 'Sensitive', 'Public'] },
  description: String,
  owner: String,
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DataAsset', dataAssetSchema);
