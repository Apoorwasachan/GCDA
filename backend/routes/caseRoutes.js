const express = require('express');
const router = express.Router();
const Case = require('../models/Case');

// GET all cases
router.get('/', async (req, res) => {
  const cases = await Case.find().sort({ createdAt: -1 });
  res.json(cases);
});

// POST new case
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const newCase = new Case({ title, description });
  await newCase.save();
  res.status(201).json(newCase);
});

// PUT update case status
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  const updated = await Case.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  try {
    const caseId = req.params.id;
    const deletedCase = await Case.findByIdAndDelete(caseId);
    
    if (!deletedCase) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.status(200).json({ message: 'Case deleted successfully' });
  } catch (error) {
    console.error('Error deleting case:', error);
    res.status(500).json({ message: 'Server error while deleting case' });
  }
});

module.exports = router;
