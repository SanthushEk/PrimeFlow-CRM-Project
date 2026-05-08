import React from "react";
import { Search, X } from "lucide-react";

export default function LeadFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) {
  const statuses = ["new", "contacted", "qualified", "won", "lost"];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">

      {/* SEARCH (NAME ONLY) */}
      <div className="relative w-full md:w-96">

        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400" />
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="w-full pl-11 pr-10 py-2.5 bg-white border rounded-2xl text-sm"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-2.5"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* STATUS FILTER */}
      <div className="flex gap-2 overflow-x-auto">

        <button
          onClick={() => setStatusFilter("")}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${
            statusFilter === "" ? "bg-slate-800 text-white" : "bg-white border"
          }`}
        >
          All
        </button>

        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize ${
              statusFilter === s ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}