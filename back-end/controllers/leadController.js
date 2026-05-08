const pool = require("../config/db");
const { createLead } = require("../models/leadModel");

// Add Lead
const addLead = async (req, res) => {
  try {
    const now = new Date().toISOString(); // ✅ TEXT timestamp

    const leadData = {
      ...req.body,
      created_at: now,
      updated_at: now,
    };

    const lead = await createLead(leadData);

    res.status(201).json(lead);

  } catch (error) {
    console.log("❌ Controller Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get All Leads
const getLeads = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM leads ORDER BY created_at DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get Lead By ID
const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM leads WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(result.rows[0]);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Lead (UPDATED FOR TEXT TIMESTAMPS)
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      company,
      email,
      phone,
      source,
      assigned,
      status,
      value,
    } = req.body;

    const updatedAt = new Date().toISOString(); // ✅ TEXT FORMAT

    const result = await pool.query(
      `UPDATE leads 
       SET name=$1,
           company=$2,
           email=$3,
           phone=$4,
           source=$5,
           assigned=$6,
           status=$7,
           value=$8,
           updated_at=$9
       WHERE id=$10
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
        updatedAt,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
};

// Delete Lead
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM leads WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  addLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
};