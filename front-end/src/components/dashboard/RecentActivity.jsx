// components/dashboard/RecentActivity.jsx

import React from "react";

export default function RecentActivity() {
  const activities = [
    "New customer registered",
    "Lead converted to deal",
    "Payment received",
    "New project assigned",
  ];

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
      
      <h3 className="text-lg font-bold text-slate-900 mb-5">
        Recent Activity
      </h3>

      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>

            <p className="text-sm text-slate-600">
              {activity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}