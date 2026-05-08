// pages/Dashboard.jsx
import React, { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Footer from "../components/layout/Footer";

import DashboardHero from "../components/dashboard/DashboardHero";
import KPISection from "../components/dashboard/KPISection";
import RevenueGrowthChart from "../components/dashboard/RevenueGrowthChart";
import MonthlyLeadsChart from "../components/dashboard/MonthlyLeadsChart";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen overflow-y-auto">

        {/* Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Dashboard Body */}
        <main className="flex-1 mt-8 p-4 sm:p-6 lg:p-8 flex flex-col">

          {/* Hero */}
          <DashboardHero />

          {/* KPI Cards */}
          <KPISection />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2 mb-2">
            {/* Revenue Chart Wrapper */}
            <div className="h-[450px] w-full flex">
              <RevenueGrowthChart />
            </div>

            {/* Bar Chart Wrapper */}
            <div className="h-[450px] w-full flex">
              <MonthlyLeadsChart/>
            </div>
          </div>

          {/* footer*/}
          <Footer />
        </main>
      </div>
    </div>
  );
}