import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1">

        {/* TOPBAR */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* PAGE CONTENT */}
        <main className="mt-16 lg:ml-64 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}