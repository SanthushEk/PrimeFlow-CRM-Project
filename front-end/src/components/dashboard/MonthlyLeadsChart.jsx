import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BarChart2, Inbox } from "lucide-react";

export default function PrimaryBarChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/revenue");

        setData(
          res.data.map((i) => ({
            month: i.month,
            revenue: Number(i.revenue),
          }))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="bg-primary rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden text-white h-full flex flex-col">

        {/* Decorative glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

        {/* Header */}
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 bg-primary rounded-lg">
                <BarChart2 size={18} className="text-white" />
              </span>
              <h3 className="text-indigo-100 font-medium text-sm tracking-wide uppercase">
                Revenue Metrics
              </h3>
            </div>

          </div>
        </div>

        {/* Chart Section */}
        <div className="flex-1 w-full relative z-10 min-h-0">

          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onMouseMove={(state) => {
                  if (state?.activeTooltipIndex !== undefined) {
                    setHoveredIndex(state.activeTooltipIndex);
                  }
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >

                {/* Grid */}
                <CartesianGrid
                  vertical={false}
                  stroke="rgba(255,255,255,0.1)"
                  strokeDasharray="3 3"
                />

                {/* X Axis */}
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
                  dy={10}
                />

                {/* Y Axis */}
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
                />

                {/* Tooltip */}
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                {/* Bars */}
                <Bar
                  dataKey="revenue"
                  barSize={35}
                  radius={[10, 10, 10, 10]}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === hoveredIndex
                          ? "#ffffff"
                          : "rgba(255,255,255,0.35)"
                      }
                      style={{
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </Bar>

              </BarChart>

            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Inbox className="w-12 h-12 text-indigo-200/50 mb-2" />
              <p className="text-white font-semibold">No Data to Display</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}