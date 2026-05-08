const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Monthly Leads Count
router.get("/monthly-leads", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        TO_CHAR(created_at::timestamp, 'Mon') AS month,
        COUNT(*) AS leads
      FROM leads
      GROUP BY month
      ORDER BY MIN(created_at::timestamp)
    `);

    res.json(result.rows);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;