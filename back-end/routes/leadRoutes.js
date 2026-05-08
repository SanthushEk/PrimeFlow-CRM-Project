const express = require("express");
const router = express.Router();

const { addLead,getLeads,getLeadById, updateLead, deleteLead } = require("../controllers/leadController");

// POST /api/leads
router.post("/", addLead);
//Get data from /api/leads
router.get("/",  getLeads); 
//Get a single lead by id from the database leads table
router.get("/:id", getLeadById);
//Update a lead by id from the database leads table
router.put("/:id", updateLead);
//Delete a lead by id from the database leads table
router.delete("/:id", deleteLead);

module.exports = router;  