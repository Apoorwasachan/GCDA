const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["Security", "Compliance", "IT", "HR"], default: "Security" },
  effectiveDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Policy = mongoose.model("Policy", policySchema);
module.exports = Policy;
