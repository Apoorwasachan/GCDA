const express = require("express");
const router = express.Router();
const DSAR = require("../models/DSAR");
const authMiddleware = require("../middleware/authMiddleware");

// Create DSAR request (User)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { requestType, details } = req.body;
    const newRequest = await DSAR.create({
      userId: req.user.id,
      requestType,
      details,
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Failed to create DSAR request" });
  }
});

// Get all DSAR requests of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const requests = await DSAR.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch DSAR requests" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const dsarRequest = await DSAR.findById(req.params.id);
    if (!dsarRequest) return res.status(404).json({ message: "DSAR request not found" });

    // Check if the logged-in user owns this DSAR request
    if (dsarRequest.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this request" });
    }

    // Delete the request by ID
    await DSAR.findByIdAndDelete(req.params.id);

    res.json({ message: "DSAR request deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete DSAR request" });
  }
});


router.get("/all", authMiddleware, async (req, res) => {
  try {
    const requests = await DSAR.find().populate("userId", "name email").sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch DSAR requests" });
  }
});

// Get all DSAR requests (admin)
router.get('/admin', authMiddleware, async (req, res) => {
  try {
    const allRequests = await DSAR.find().sort({ createdAt: -1 });
    res.json(allRequests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch DSAR requests' });
  }
});

// Update DSAR status (admin)
router.put('/admin/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const dsarRequest = await DSAR.findById(req.params.id);
    if (!dsarRequest) return res.status(404).json({ message: 'Request not found' });

    dsarRequest.status = status;
    await dsarRequest.save();
    res.json(dsarRequest);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status' });
  }
});


module.exports = router;
