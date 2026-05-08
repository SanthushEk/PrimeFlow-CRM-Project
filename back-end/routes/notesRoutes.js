const express = require("express");
const router = express.Router();

const {
  getNotesByLead,
  addNote,
  deleteNote
} = require("../controllers/notesController");

/* GET NOTES */
router.get("/leads/:leadId/notes", getNotesByLead);

/* ADD NOTE */
router.post("/leads/:leadId/notes", addNote);

/* DELETE NOTE */
router.delete("/notes/:noteId", deleteNote);

module.exports = router;