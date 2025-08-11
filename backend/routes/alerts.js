const express = require('express');
const Alert = require('../models/Alert');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, description, severity, timestamp } = req.body;

    const newAlert = new Alert({
      title,
      description,
      severity,
      timestamp
    });

    const savedAlert = await newAlert.save();
    res.status(201).json(savedAlert);
  } catch (err) {
    console.error(" Error while creating alert:", err); // FULL log
    res.status(500).json({ message: "Failed to create alert", error: err.message || err });
  }
});
// GET all alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }).limit(50);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err });
  }
});

// GET Alert Trends (Last 7 Days)
router.get('/trends', async (req, res) => {
  try {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const trendData = await Alert.aggregate([
      {
        $match: {
          timestamp: { $gte: last7Days }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            severity: '$severity'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.date',
          severities: {
            $push: {
              k: '$_id.severity',
              v: '$count'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          counts: { $arrayToObject: '$severities' }
        }
      },
      {
        $sort: { date: 1 }
      }
    ]);

    res.json(trendData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alert trends', error });
  }
});

module.exports = router;


