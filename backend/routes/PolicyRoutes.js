const express = require("express");
const Policy = require("../models/Policy");

const router = express.Router();

// Add a new policy
router.post("/", async (req, res) => {
  try {
    const newPolicy = new Policy(req.body);
    await newPolicy.save();
    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(500).json({ message: "Error adding policy", error });
  }
});

// Get all policies
router.get("/", async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching policies", error });
  }
});

// Delete a policy
router.delete("/:id", async (req, res) => {
  try {
    await Policy.findByIdAndDelete(req.params.id);
    res.json({ message: "Policy deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting policy", error });
  }
});

module.exports = router;
