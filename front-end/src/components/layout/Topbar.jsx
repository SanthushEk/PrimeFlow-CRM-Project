import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/auth";
import ConfirmModal from "../common/ConfirmModal";

const Topbar = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // decode JWT
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        setUser(null);
      }
    }
  }, []);

  // logout handler
  const handleLogout = async () => {
    try {
      await logoutUser(); // backend call
    } catch (err) {
      console.log("Logout API error:", err);
    }

    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 right-0 left-0 lg:left-60 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 flex items-center justify-between px-6 lg:px-8">

        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-primary hover:bg-slate-100 rounded-xl transition-all"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Notifications */}
          <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="w-[1px] h-6 bg-slate-200 mx-2 hidden sm:block"></div>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>

            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1 pr-3 hover:bg-slate-100 rounded-2xl"
            >

              {/* Avatar */}
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              {/* Info */}
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-primary">
                  {user?.name || "Guest User"}
                </p>
                <p className="text-[10px] text-slate-500 uppercase">
                  {user?.role || "User"}
                </p>
              </div>

              <ChevronDown
                size={14}
                className={`transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border p-2 transition-all origin-top-right
              ${
                isProfileOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >

              <div className="px-4 py-3 border-b mb-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase">
                  Account
                </p>
              </div>

              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold hover:bg-slate-50 rounded-xl">
                <User size={16} />
                My Profile
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold hover:bg-slate-50 rounded-xl">
                <Settings size={16} />
                Settings
              </button>

              <div className="my-2 border-t"></div>

              {/* LOGOUT */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl"
              >
                <LogOut size={16} />
                Sign Out
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* ✅ CONFIRM MODAL */}
      <ConfirmModal
        isOpen={showLogoutModal}
        title="Sign Out"
        message="Are you sure you want to logout from your account?"
        confirmText="Logout"
        cancelText="Cancel"
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          setShowLogoutModal(false);
          handleLogout();
        }}
      />
    </>
  );
};

export default Topbar;