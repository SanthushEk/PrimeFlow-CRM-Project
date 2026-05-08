import React from "react";
// 1. Import your logo here
import LogoImg from "../../assets/logo.jpg"; 
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Settings,
  X,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Leads", path: "/leads", icon: <Users size={20} /> },
    { name: "Customers", path: "/customers", icon: <Users size={20} /> },
    { name: "Projects", path: "/projects", icon: <Briefcase size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-[70] h-screen w-64 bg-primary text-slate-400 transition-all duration-500 flex flex-col border-r border-white/5
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        
        {/* Brand Section with Imported Logo */}
        <div className="h-24 flex items-center px-8 mb-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            {/* Logo Container */}
            <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:border-accent/50 transition-all duration-300 shadow-inner">
              <img 
                src={LogoImg} 
                alt="PrimeFlow Logo" 
                className="w-10 h-10 object-contain group-hover:rotate-[15deg] transition-transform duration-500" 
              />
            </div>
            
            {/* Text Identity */}
            <div className="flex flex-col">
              <h1 className="text-white font-bold text-xl tracking-tight leading-none">
                Prime<span className="font-extralight opacity-80">Flow</span>
              </h1>
            </div>
          </div>

          <button onClick={toggleSidebar} className="lg:hidden ml-auto text-white/50 hover:text-white p-1 hover:bg-white/5 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Menu Section */}
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden
                ${
                  isActive
                    ? "bg-white/10 text-white shadow-[inset_0px_0px_10px_rgba(255,255,255,0.05)]"
                    : "hover:bg-white/5 hover:text-slate-200"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator Bar */}
                  <div 
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent rounded-r-full transition-all duration-300
                    ${isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 group-hover:opacity-40 group-hover:scale-y-50"}`} 
                  />

                  <div className="flex items-center gap-4 relative z-10">
                    <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-accent" : "text-slate-400"}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium tracking-wide">{item.name}</span>
                  </div>

                  <ChevronRight 
                    size={14} 
                    className={`transition-all duration-300 transform 
                    ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0"}`} 
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Optional Footer: Connection Status or User */}
        <div className="p-6 mt-auto border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 tracking-wider">NETWORK SECURED</span>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;