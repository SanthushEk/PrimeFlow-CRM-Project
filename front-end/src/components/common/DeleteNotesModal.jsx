import React from "react";
import { Trash2, X, AlertTriangle } from "lucide-react";

export default function DeleteNoteModal({
  open,
  onClose,
  onConfirm,
  loading,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with Blur - Matching your lead delete style */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-gray-100">
        
        {/* Close Button (Top Corner) */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Warning Icon Container - Using bg-red-50 to match the warning theme */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-primary">
            <Trash2 size={28} />
          </div>

          {/* Text Content */}
          <h2 className="text-xl font-bold text-gray-900">
            Delete Note
          </h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed px-2">
            Are you sure you want to permanently delete this note? This action cannot be undone and the information will be lost forever.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:bg-gray-100 sm:flex-none"
          >
            Cancel
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
              <div className="flex items-center justify-center gap-2">
                <Trash2 size={16} />
                <span>Delete Note</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}