const mongoose = require("mongoose");

const dsarSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  requestType: { type: String, enum: ["Access", "Deletion", "Correction"], required: true },
  details: { type: String },
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const DSAR = mongoose.model("DSAR", dsarSchema);
module.exports = DSAR;



