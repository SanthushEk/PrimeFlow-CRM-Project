import React from "react";

export default function ConfirmModal({
  open,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">

      <div className="bg-white w-[90%] max-w-md rounded-xl p-6 shadow-xl">

        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        <p className="text-gray-500 mb-6">{message}</p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Yes, Logout
          </button>

        </div>

      </div>
    </div>
  );
}