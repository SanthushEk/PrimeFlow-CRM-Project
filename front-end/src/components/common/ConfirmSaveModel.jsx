import React from "react";
import { Save, AlertCircle, X } from "lucide-react";

export default function ConfirmSaveModal({ open, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-in fade-in duration-200">
      
      {/* MODAL CONTAINER */}
      <div className="bg-white w-[90%] max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* HEADER ICON SECTION */}
        <div className="bg-slate-50 p-6 flex flex-col items-center border-b border-slate-100">
          <button 
            onClick={onCancel}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mb-4 ring-8 ring-blue-50">
            <Save size={32} />
          </div>
          
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Commit Changes?
          </h2>
        </div>

        {/* BODY */}
        <div className="p-6 text-center">
          <p className="text-sm font-medium text-slate-500 leading-relaxed">
            You are about to update the lead profile. This action will overwrite existing data with the new values provided.
          </p>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-amber-600 bg-amber-50 py-2 px-3 rounded-lg uppercase tracking-widest">
            <AlertCircle size={14} />
            Data will be synced to server
          </div>
        </div>

        {/* ACTIONS */}
        <div className="p-4 bg-slate-50 flex flex-col gap-2 border-t border-slate-100">
          <button
            onClick={onConfirm}
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
          >
            Yes, Save Changes
          </button>

          <button
            onClick={onCancel}
            className="w-full py-3 rounded-xl bg-transparent text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-slate-800 transition-all"
          >
            Go Back
          </button>
        </div>

      </div>

    </div>
  );
}