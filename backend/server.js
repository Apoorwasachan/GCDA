const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/UserRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const caseRoutes = require('./routes/caseRoutes');
const alertRoutes = require('./routes/alerts.js');
const analyticsRoutes = require('./routes/analytics');
const policyRoutes = require("./routes/PolicyRoutes");
const dsar = require('./routes/dsar');



// const adminRoutes = require("./routes/adminRoutes");
// app.use("/api/admin", adminRoutes);
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.use('/api/alerts', alertRoutes);
app.use("/api/users", userRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use("/api/policies", policyRoutes);
app.use('/api/dsar', dsar);

app.get("/secure-data", authMiddleware, (req, res) => {
  res.json({ message: "This is protected data." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

