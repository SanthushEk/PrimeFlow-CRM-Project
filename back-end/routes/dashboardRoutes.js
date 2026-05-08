const express = require("express");
const router = express.Router();

const { getDashboard, getStats } = require("../controllers/dashboardController");
const auth = require("../middleware/authMiddleware");
// Dashboard routes
router.get("/", auth, getDashboard);
// Stats route
router.get("/stats", auth, getStats);

module.exports = router;

