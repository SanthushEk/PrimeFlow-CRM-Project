// components/dashboard/TeamPerformance.jsx

import React from "react";

export default function TeamPerformance() {
  const team = [
    { name: "John", progress: "85%" },
    { name: "Sarah", progress: "72%" },
    { name: "David", progress: "64%" },
  ];

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
      
      <h3 className="text-lg font-bold text-slate-900 mb-5">
        Team Performance
      </h3>

      <div className="space-y-5">
        {team.map((member, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                {member.name}
              </span>

              <span className="text-sm text-slate-500">
                {member.progress}
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: member.progress }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}