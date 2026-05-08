// components/dashboard/LeadCards.jsx
import React from "react";

export default function LeadCards({ leads = [] }) {
  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const won = leads.filter((l) => l.status === "Won").length;
  const qualified = leads.filter((l) => l.status === "Qualified").length;
  const totalValue = leads.reduce((sum, l) => sum + (Number(l.value) || 0), 0);

  const stats = [
    { title: "Total Leads", value: total, label: "Database" },
    { title: "New Leads", value: newLeads, label: "Active" },
    { title: "Qualified", value: qualified, label: "Pipeline" },
    { title: "Won", value: won, label: "Closed" },
    { title: "Total Value", value: `$${totalValue.toLocaleString()}`, label: "Revenue" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-primary p-5 rounded-[1.5rem] shadow-lg shadow-primary/10 relative overflow-hidden flex flex-col justify-between min-h-[110px] border border-white/10"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -mr-8 -mt-8" />
          
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">
              {stat.title}
            </p>
            <h2 className="text-2xl font-black text-white tracking-tight leading-none">
              {stat.value}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-white/10 text-[8px] font-bold text-white/80 uppercase tracking-widest">
              {stat.label}
            </span>
          </div>
          
          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20" />
        </div>
      ))}
    </div>
  );
}