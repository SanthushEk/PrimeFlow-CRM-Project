import React, { useState } from "react";
import { X, PenLine, User, AlignLeft } from "lucide-react";
import axios from "axios";
import Notification from "../common/Notification";

export default function NewNote({
  leadId,
  open,
  onClose,
  onSuccess,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "success",
  });

  if (!open) return null;

  const showNotification = (message, type = "success") => {
    setNotification({ open: true, message, type });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  const handleSave = async () => {
    if (!title || !content) {
      showNotification("Title and Content are required", "error");
      return;
    }

    try {
      const payload = {
        title,
        content,
        created_by: createdBy || "Admin",
      };

      const res = await axios.post(
        `http://localhost:5000/api/leads/${leadId}/notes`,
        payload
      );

      onSuccess(res.data);
      showNotification("Note added successfully!", "success");
      
      // Reset and close
      setTitle("");
      setContent("");
      setCreatedBy("");
      setTimeout(() => onClose(), 800);
    } catch (error) {
      showNotification("Failed to save note", "error");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setCreatedBy("");
    onClose();
  };

  return (
    <>
      <Notification notification={notification} />

      {/* BACKDROP */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
        
        {/* MODAL CONTAINER */}
        <div className="bg-white w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] border-2 border-slate-200 overflow-hidden">
          
          {/* ACCENT TOP BAR */}
          <div className="h-2 bg-primary w-full" />

          <div className="p-8">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">
                  Create Log Entry
                </h2>
                <p className="text-xs font-bold text-slate-400 mt-1">LEAD REF: {leadId}</p>
              </div>
              <button 
                onClick={handleCancel}
                className="p-2 hover:bg-slate-100 rounded-none text-slate-400 hover:text-primary transition-colors border border-transparent hover:border-slate-200"
              >
                <X size={20} strokeWidth={3} />
              </button>
            </div>

            {/* FORM FIELDS */}
            <div className="space-y-6">
              {/* TITLE FIELD */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  <PenLine size={12} className="text-primary" />
                  Note Heading
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Follow-up Meeting"
                  className="w-full bg-slate-50 border-2 border-slate-200 p-3 rounded-none focus:outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-800 placeholder:text-slate-300"
                />
              </div>

              {/* CONTENT FIELD */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  <AlignLeft size={12} className="text-primary" />
                  Detailed Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Summarize the interaction..."
                  className="w-full bg-slate-50 border-2 border-slate-200 p-3 rounded-none h-32 focus:outline-none focus:border-primary focus:bg-white transition-all font-medium text-slate-700 placeholder:text-slate-300 resize-none"
                />
              </div>

              {/* CREATED BY */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  <User size={12} className="text-primary" />
                  Author Name
                </label>
                <input
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  placeholder="Your Name (Optional)"
                  className="w-full bg-slate-50 border-2 border-slate-200 p-3 rounded-none focus:outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-800 placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={handleCancel}
                className="px-6 py-3 text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
              >
                Discard
              </button>

              <button
                onClick={handleSave}
                className="bg-primary hover:brightness-110 text-white px-8 py-3 font-black text-xs uppercase tracking-[0.2em] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}