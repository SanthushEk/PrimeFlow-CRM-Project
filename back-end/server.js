const express = require("express");
const cors = require("cors");
require("dotenv").config();

/* ---------------- ROUTES ---------------- */
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const leadRoutes = require("./routes/leadRoutes");
const revenueRoutes = require("./routes/revenueRoutes");
const leadStatsRoutes = require("./routes/leadStatsRoutes");
const notesRoutes = require("./routes/notesRoutes");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "CRM Backend API Running 🚀",
  });
});

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/stats", leadStatsRoutes);

// 🔥 NEW ROUTE REGISTERED
app.use("/api", notesRoutes);

/* ---------------- ERROR HANDLING ---------------- */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/* ---------------- SERVER START ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});