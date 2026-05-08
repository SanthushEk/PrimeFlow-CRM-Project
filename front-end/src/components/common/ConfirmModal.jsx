import React from "react";
import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false, // Added loading prop
  variant = "danger", // 'danger' or 'primary'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div 
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onCancel}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all border border-gray-100 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button (Top Corner) */}
        <button 
          onClick={onCancel}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Icon Container */}
          <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${variant === 'danger' ? 'bg-red-50 text-primary' : 'bg-blue-50 text-blue-600'}`}>
            <AlertTriangle size={28} />
          </div>

          {/* Text Content */}
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 sm:flex-none"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all active:scale-95 disabled:opacity-70 sm:flex-none ${
              variant === 'danger' 
                ? 'bg-primary hover:bg-red-700 shadow-red-100' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Processing...</span>
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;