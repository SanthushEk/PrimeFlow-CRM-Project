import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChevronLeft, Edit3, Check, Mail, Phone,
  Globe, ShieldCheck, Building2, Tag,
  PlusCircle, User, Briefcase, Calendar, MapPin
} from "lucide-react";

import ConfirmSaveModal from "../components/common/ConfirmSaveModel";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [originalLead, setOriginalLead] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  const statusOptions = ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"];

  // Logic remains unchanged
  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/leads/${id}`);
        setLead(res.data);
        setOriginalLead(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setLead(originalLead);
    setIsEditing(false);
  };

  const confirmSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, lead);
      setOriginalLead(lead);
      setIsEditing(false);
      setShowConfirm(false);
    } catch (error) {
      alert("Update failed");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-[#00172f] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!lead) return null;

  return (
    <div className="min-h-screen bg-[#f4f7f9] flex flex-col text-slate-800">
      
      {/* BRANDED HEADER */}
      <div className="bg-[#00172f] text-white pt-8 pb-24 px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} /> <span className="text-sm font-medium">Back to CRM</span>
          </button>
          
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all"
              >
                <Edit3 size={16} /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleCancel} className="px-4 py-2 text-sm font-semibold text-white/70 hover:text-white">
                  Cancel
                </button>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all shadow-lg shadow-emerald-900/20"
                >
                  <Check size={16} /> Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto w-full px-8 -mt-16 pb-12">
        <div className="grid grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: PROFILE CARD */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-[#00172f] rounded-full flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg mb-4">
                  {lead.name?.charAt(0)}
                </div>
                
                {isEditing ? (
                  <input
                    name="name"
                    value={lead.name}
                    onChange={handleChange}
                    className="text-2xl font-bold text-center border-b border-blue-500 outline-none w-full mb-2"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-[#00172f]">{lead.name}</h2>
                )}
                
                <p className="text-slate-500 font-medium flex items-center gap-2 mb-6">
                  <Briefcase size={16} /> {lead.company}
                </p>

                <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                  lead.status === "Won" ? "bg-emerald-100 text-emerald-700" : 
                  lead.status === "Lost" ? "bg-red-100 text-red-700" : 
                  "bg-slate-100 text-[#00172f]"
                }`}>
                  {lead.status}
                </div>
              </div>

              <div className="border-t border-slate-50 p-6 space-y-4">
                <div className="flex items-center gap-4 text-sm">
                   <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[#00172f]">
                      <Mail size={18} />
                   </div>
                   <div className="flex-1 overflow-hidden">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Email</p>
                      <p className="font-semibold truncate">{lead.email}</p>
                   </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                   <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[#00172f]">
                      <Phone size={18} />
                   </div>
                   <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Phone</p>
                      <p className="font-semibold">{lead.phone}</p>
                   </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50/50">
                <button 
                   onClick={() => navigate(`/leads/${id}/notes`)}
                   className="w-full bg-white border border-slate-200 hover:border-[#00172f] text-[#00172f] py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-sm"
                >
                   <PlusCircle size={18} /> Activity Notes
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS & META */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100">
                <h3 className="font-bold text-[#00172f] flex items-center gap-2">
                  <User size={18} className="text-slate-400" /> Lead Information
                </h3>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <AboutField label="Lead Source" name="source" value={lead.source} onChange={handleChange} isEditing={isEditing} icon={<Globe size={16}/>} />
                <AboutField label="Assigned Rep" name="assigned" value={lead.assigned} onChange={handleChange} isEditing={isEditing} icon={<ShieldCheck size={16}/>} />
                
                {isEditing && (
                  <div className="col-span-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase mb-2 block tracking-wider">Pipeline Status</label>
                    <select
                      name="status"
                      value={lead.status}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-[#00172f] outline-none"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* SYSTEM INFO TABLE */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h3 className="font-bold text-[#00172f] mb-6">Engagement Metadata</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Creation Date</p>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Calendar size={16} className="text-slate-300" />
                    <span className="font-medium text-sm">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Last Update</p>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Calendar size={16} className="text-slate-300" />
                    <span className="font-medium text-sm">
                      {lead.updated_at ? new Date(lead.updated_at).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </main>

      <ConfirmSaveModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSave}
      />
    </div>
  );
}

function AboutField({ label, name, value, onChange, isEditing, icon }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        {icon} {label}
      </label>
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={!isEditing}
        className={`px-4 py-3 rounded-xl text-sm transition-all border
          ${isEditing 
            ? "border-blue-200 bg-white ring-2 ring-blue-50" 
            : "border-transparent bg-slate-50 text-slate-600 font-medium"
          }`}
      />
    </div>
  );
}