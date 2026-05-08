import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { BarChart3, AlertCircle, Loader2 } from "lucide-react";

export default function ModernDarkRevenueLine() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const totalRevenue = data.reduce(
    (acc, curr) => acc + curr.revenue,
    0
  );

  return (
    <div className="w-full h-full">
      <div className="bg-primary rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl h-full flex flex-col relative overflow-hidden">

        {/* Decorative glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-indigo-100 font-medium text-sm tracking-wide uppercase">
              Total Revenue
            </span>
          </div>

        </div>

        {/* Chart Area */}
        <div className="flex-1 w-full flex items-center justify-center min-h-0">

          {loading ? (
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          ) : data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>

                {/* Grid */}
                <CartesianGrid
                  stroke="#1f2937"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                {/* X Axis */}
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />

                {/* Y Axis */}
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />

                {/* Tooltip */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                {/* Line */}
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#818cf8"
                  strokeWidth={4}
                  dot={{ r: 4, fill: "#818cf8" }}
                  activeDot={{ r: 6, fill: "#ffffff" }}
                />

              </LineChart>

            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center">
              <AlertCircle className="w-12 h-12 text-slate-600 mb-2" />
              <p className="text-slate-300 font-semibold">
                No Data Found
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}