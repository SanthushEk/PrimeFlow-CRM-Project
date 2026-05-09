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
  const [popup, setPopup] = useState({
    show: false,
    type: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });

    setTimeout(() => {
      setPopup({ show: false, type: "", message: "" });
    }, 3000);
  };

  const validateForm = () => {
    return Object.values(form).every((value) => value.toString().trim() !== "");
  };

  const handleSubmit = async () => {
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

      // ✅ FIX: await axios + store response
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/leads`,
        payload
      );

      showPopup("success", "Lead created successfully!");

      // ✅ correct response usage
      onSave(res.data);

      setTimeout(() => {
        onClose();
        setForm(initialForm);
      }, 1000);
    } catch (error) {
      console.log("API Error:", error);
      showPopup("error", "Server error: Failed to create lead.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none";

  const labelClass =
    "block mb-1.5 text-sm font-medium text-gray-700";

  return (
    <>
      {/* POPUP */}
      {popup.show && (
        <div className="fixed top-5 right-5 z-[60]">
          <div
            className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white ${
              popup.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {popup.type === "success" ? (
              <CheckCircle2 size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {popup.message}
          </div>
        </div>
      )}

      {/* OVERLAY */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">

          {/* HEADER */}
          <div className="px-6 py-5 flex justify-between items-center border-b">
            <div className="flex items-center gap-3">
              <UserPlus size={24} className="text-blue-600" />
              <div>
                <h2 className="text-xl font-bold">Add New Lead</h2>
                <p className="text-xs text-gray-500">
                  Enter details to register a new lead
                </p>
              </div>
            </div>

            <button onClick={onClose}>
              <X />
            </button>
          </div>

          {/* FORM */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

            <input name="name" value={form.name} placeholder="Lead Name"
              className={inputClass} onChange={handleChange} />

            <input name="company" value={form.company} placeholder="Company"
              className={inputClass} onChange={handleChange} />

            <input name="email" value={form.email} placeholder="Email"
              className={inputClass} onChange={handleChange} />

            <input name="phone" value={form.phone} placeholder="Phone"
              className={inputClass} onChange={handleChange} />

            <input name="source" value={form.source} placeholder="Source"
              className={inputClass} onChange={handleChange} />

            <input name="assigned" value={form.assigned} placeholder="Assigned"
              className={inputClass} onChange={handleChange} />

            <input name="value" value={form.value} placeholder="Value"
              className={inputClass} onChange={handleChange} />

            <select name="status" value={form.status}
              className={inputClass} onChange={handleChange}>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Won</option>
              <option>Lost</option>
            </select>

          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 flex justify-end gap-3 border-t bg-gray-50">

            <button onClick={onClose} className="px-4 py-2 text-gray-600">
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              {loading ? "Saving..." : (
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