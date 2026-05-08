const pool = require("../config/db");

// dashboard welcome
const getDashboard = (req, res) => {
  res.json({ message: "Welcome to CRM Dashboard" });
};

// KPI STATS
const getStats = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM leads");
    const leads = result.rows;

    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === "New").length;
    const qualified = leads.filter(l => l.status === "Qualified").length;
    const won = leads.filter(l => l.status === "Won").length;
    const lost = leads.filter(l => l.status === "Lost").length;

    const totalValue = leads.reduce(
      (sum, l) => sum + Number(l.value || 0),
      0
    );

    const wonValue = leads
      .filter(l => l.status === "Won")
      .reduce((sum, l) => sum + Number(l.value || 0), 0);

    const stats = [
      { title: "Total Leads", value: totalLeads, growth: "+12%" },
      { title: "New Leads", value: newLeads, growth: "+8%" },
      { title: "Qualified Leads", value: qualified, growth: "+5%" },
      { title: "Won Leads", value: won, growth: "+10%" },
      { title: "Lost Leads", value: lost, growth: "-2%" },
      { title: "Estimated Deal", value: `$${totalValue}`, growth: "+18%" },
      { title: "Won Deal Value", value: `$${wonValue}`, growth: "+20%" },
    ];

    return res.status(200).json(stats);
  } catch (error) {
    console.log("❌ Dashboard Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboard, getStats };