const db = require("../config/db");

/* GET NOTES */
exports.getNotesByLead = async (req, res) => {
  const { leadId } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM notes 
       WHERE lead_id = $1 
       ORDER BY created_at DESC`,
      [leadId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/* ADD NOTE */
exports.addNote = async (req, res) => {
  const { leadId } = req.params;
  const { title, content, created_by } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO notes (lead_id, title, content, created_by)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [leadId, title, content, created_by || "Admin"]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/* DELETE NOTE */
exports.deleteNote = async (req, res) => {
  const { noteId } = req.params;

  console.log("🗑 DELETE NOTE REQUEST:", noteId);

  try {

    const result = await db.query(
      `DELETE FROM notes
       WHERE id = $1
       RETURNING *`,
      [noteId]
    );

    // NOT FOUND
    if (result.rows.length === 0) {

      console.log("❌ Note Not Found");

      return res.status(404).json({
        message: "Note not found",
      });
    }

    console.log("✅ Note Deleted");

    res.json({
      message: "Note deleted successfully",
      deleted: result.rows[0],
    });

  } catch (error) {

    console.error("🔥 Delete Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};