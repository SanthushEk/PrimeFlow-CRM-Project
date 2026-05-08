import React, { useState } from "react";
import axios from "axios";
import { X, UserPlus, Send, AlertCircle, CheckCircle2 } from "lucide-react";

const getSriLankaTime = () => {
  return new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Colombo",
  });
};

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  source: "",
  assigned: "",
  status: "New",
  value: "",
};

export default function LeadFormModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 3000);
  };

  // Logic: Check if every single field in the form object has a value
  const validateForm = () => {
    return Object.values(form).every((value) => value.trim() !== "");
  };

  const handleSubmit = async () => {
    // Check if any field is empty
    if (!validateForm()) {
      showPopup("error", "Please fill in all fields before submitting.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        createdAt: getSriLankaTime(),
        updatedAt: getSriLankaTime(),
      };

      const res = await axios.post("http://localhost:5000/api/leads", payload);

      showPopup("success", "Lead created successfully!");
      onSave(res.data);
      
      // Delay closing slightly so user sees the success message
      setTimeout(() => {
        onClose();
        setForm(initialForm);
      }, 1000);

    } catch (error) {
      showPopup("error", "Server error: Failed to create lead.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none";
  const labelClass = "block mb-1.5 text-sm font-medium text-gray-700";

  return (
    <>
      {/* NOTIFICATION POPUP */}
      {popup.show && (
        <div className="fixed top-5 right-5 z-[60] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white font-extralight ${
            popup.type === "success" ? "bg-primary" : "bg-rose-950"
          }`}>
            {popup.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            {popup.message}
          </div>
        </div>
      )}

      {/* OVERLAY */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
        
        {/* MODAL CONTAINER */}
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* HEADER */}
          <div className="px-6 py-5 flex justify-between items-center bg-white border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-primary rounded-lg">
                <UserPlus size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Add New Lead</h2>
                <p className="text-xs text-gray-500">Enter details to register a new lead in the CRM</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* FORM BODY */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              
              <div>
                <label className={labelClass}>Lead Name</label>
                <input name="name" value={form.name} placeholder="e.g. John Doe" className={inputClass} onChange={handleChange} />
              </div>

              <div>
                <label className={labelClass}>Company</label>
                <input name="company" value={form.company} placeholder="e.g. ABC Corp" className={inputClass} onChange={handleChange} />
              </div>

              <div>
                <label className={labelClass}>Email Address</label>
                <input name="email" type="email" value={form.email} placeholder="john@example.com" className={inputClass} onChange={handleChange} />
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input name="phone" value={form.phone} placeholder="+94 77..." className={inputClass} onChange={handleChange} />
              </div>

              <div>
                <label className={labelClass}>Lead Source</label>
                <input name="source" value={form.source} placeholder="e.g. Facebook, Referral" className={inputClass} onChange={handleChange} />
              </div>

              <div>
                <label className={labelClass}>Assigned Agent</label>
                <input name="assigned" value={form.assigned} placeholder="Staff name" className={inputClass} onChange={handleChange} />
              </div>

              <div>
                <label className={labelClass}>Deal Value ($)</label>
                <input name="value" type="number" value={form.value} placeholder="0.00" className={inputClass} onChange={handleChange} />
              </div>

              <div>
                <label className={labelClass}>Lead Status</label>
                <select name="status" value={form.status} className={inputClass} onChange={handleChange}>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

            </div>
          </div>

          {/* ACTIONS */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
            <button 
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold text-white shadow-md transition-all active:scale-95 ${
                loading ? "bg-primary cursor-not-allowed" : "bg-primary border hover:bg-white hover:text-primary hover:border-primary"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Create Lead
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}