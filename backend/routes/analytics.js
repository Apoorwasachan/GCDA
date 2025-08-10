const express = require('express');
const router = express.Router();
const AuditLog = require('../models/analytics/AuditLogModel');
const Vulnerability = require('../models/analytics/VulnerabilityModel');


// GET: Audit Logs
router.get('/auditlogs', async (req, res) => {
  try {
    const logs = await AuditLog.find({});
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

// GET: Vulnerabilities
router.get('/vulnerabilities', async (req, res) => {
  try {
    const vulns = await Vulnerability.find({});
    res.json(vulns);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vulnerabilities' });
  }
});

module.exports = router;
