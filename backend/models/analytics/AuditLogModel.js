const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: String,
  action: String,
  role: String,
  department: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
