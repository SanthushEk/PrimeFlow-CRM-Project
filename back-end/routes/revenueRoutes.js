const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT
        TO_CHAR(created_at::timestamp, 'Mon') AS month,
        SUM(value) AS revenue
      FROM leads
      GROUP BY month
      ORDER BY MIN(created_at::timestamp)
    `);

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;