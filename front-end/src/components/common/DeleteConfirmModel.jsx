import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmModal({
  open,
  onCancel,
  onConfirm,
  loading,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onCancel}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-gray-100">
        
        {/* Close Button (Top Corner) */}
        <button 
          onClick={onCancel}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Warning Icon Container */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-primary">
            <AlertTriangle size={28} />
          </div>

          {/* Text Content */}
          <h2 className="text-xl font-bold text-gray-900">
            Confirm Deletion
          </h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Are you sure you want to delete this lead? This action is <span className="font-semibold text-red-600">permanent</span> and all associated data will be removed instantly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:bg-gray-100 sm:flex-none"
          >
            No, Keep it
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-200 transition-all hover:bg-red-700 active:scale-95 disabled:opacity-70 disabled:hover:bg-red-600 sm:flex-none"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Deleting...</span>
              </div>
            ) : (
              "Yes, Delete Lead"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}