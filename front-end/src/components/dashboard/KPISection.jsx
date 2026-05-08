import React, { useEffect, useState } from "react";
import axios from "axios";
import KPICard from "./KPICard";

export default function KPISection() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.log("❌ KPI Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading KPIs...</p>;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-6 mb-8">
      {stats.map((item, index) => (
        <KPICard key={index} {...item} />
      ))}
    </section>
  );
}