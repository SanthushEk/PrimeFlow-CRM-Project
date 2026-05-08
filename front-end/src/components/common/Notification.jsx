import React from "react";

export default function Notification({ notification }) {
  if (!notification.open) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`px-4 py-3 rounded shadow-lg text-white min-w-[250px] ${
          notification.type === "success"
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      >
        {notification.message}
      </div>
    </div>
  );
}