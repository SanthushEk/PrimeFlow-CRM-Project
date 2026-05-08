const pool = require("../config/db");

const createLead = async (data) => {
  try {
    const {
      name,
      company,
      email,
      phone,
      source,
      assigned,
      status,
      value,
      createdAt,
      updatedAt,
    } = data;

    const result = await pool.query(
      `INSERT INTO leads 
      (name, company, email, phone, source, assigned, status, value, created_at, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [
        name,
        company,
        email,
        phone,
        source,
        assigned,
        status,
        value,
        createdAt,
        updatedAt,
      ]
    );

    // ✅ SAFE CHECK
    if (!result || !result.rows || result.rows.length === 0) {
      throw new Error("Insert failed - no rows returned");
    }

    return result.rows[0];

  } catch (error) {
    console.log("DB ERROR:", error.message);
    throw error;
  }
};

module.exports = { createLead };