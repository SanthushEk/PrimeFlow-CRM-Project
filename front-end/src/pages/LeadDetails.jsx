import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChevronLeft, Edit3, Check, Mail, Phone,
  DollarSign, Globe, ShieldCheck,
  Building2, Camera, Info, Tag, PlusCircle, History, Activity
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

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/leads/${id}`);
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
      await axios.put(`http://localhost:5000/api/leads/${id}`, lead);
      setOriginalLead(lead);
      setIsEditing(false);
      setShowConfirm(false);
    } catch (error) {
      alert("Update failed");
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50 font-bold text-slate-400">
      Initializing Secure Profile...
    </div>
  );
  
  if (!lead) return null;

  return (
    <div className="h-screen overflow-hidden bg-[#f8fafc] flex flex-col font-sans text-slate-900">
      
      {/* TOP NAV */}
      <nav className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between shadow-lg z-20">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
        >
          <ChevronLeft size={18} /> 
          <span className="font-bold text-xs uppercase tracking-widest">Back to Pipeline</span>
        </button>
        
        <div className="flex gap-3">
          {/* ✅ NAVIGATE TO NOTES */}
          <button 
            onClick={() => navigate(`/leads/${id}/notes`)}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold transition-all border border-white/10"
          >
            <PlusCircle size={16} /> View Notes
          </button>

          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)} 
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-1.5 rounded-lg flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all shadow-md shadow-blue-900/20"
            >
              <Edit3 size={14} /> Edit Mode
            </button>
          ) : (
            <div className="flex gap-2 animate-in slide-in-from-right-2 duration-200">
              <button 
                onClick={handleCancel} 
                className="bg-slate-700 hover:bg-slate-600 px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowConfirm(true)} 
                className="bg-emerald-500 hover:bg-emerald-400 px-4 py-1.5 rounded-lg text-xs font-black uppercase flex items-center gap-2 text-white shadow-md shadow-emerald-900/20 transition-all"
              >
                <Check size={14} /> Commit Changes
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-8 py-8 flex items-center gap-10">
          <div className="relative group">
            <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-slate-800 to-slate-950 border-4 border-white shadow-2xl flex items-center justify-center text-white text-4xl font-black italic transform transition-transform group-hover:rotate-3">
              {lead.name?.charAt(0)}
            </div>
            {isEditing && (
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2.5 rounded-xl border-4 border-white cursor-pointer shadow-lg hover:scale-110 transition-all">
                <Camera size={16} />
              </div>
            )}
          </div>

          <div className="flex-grow space-y-3">
            {!isEditing ? (
              <>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">{lead.name}</h1>
                <div className="flex items-center gap-4 text-slate-500 font-bold">
                  <span className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-1 rounded-full text-sm">
                    <Building2 size={16} className="text-slate-400" /> {lead.company}
                  </span>
                  <span className={`flex items-center gap-2 px-4 py-1 rounded-full text-sm uppercase tracking-wider font-black ${
                    lead.status === 'Won' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-700'
                  }`}>
                    <Tag size={16} /> {lead.status}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 max-w-md">
                <input 
                  name="name" 
                  value={lead.name} 
                  onChange={handleChange} 
                  className="text-2xl font-bold border-b-2 border-blue-500 outline-none bg-blue-50/40 px-3 py-1 rounded-t-xl" 
                />
                <input 
                  name="company" 
                  value={lead.company} 
                  onChange={handleChange} 
                  className="text-sm font-semibold border-b border-slate-200 outline-none px-3 py-1 text-slate-500" 
                />
              </div >
            )}
          </div>

          <div className="hidden lg:block text-right border-l pl-10 border-slate-100">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Contract Valuation</p>
             <p className="text-4xl font-black text-slate-900">
               <span className="text-emerald-600 font-medium mr-1">$</span>
               {Number(lead.value || 0).toLocaleString()}
             </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow p-8 overflow-y-auto bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          
          {/* COLUMN 1: CORE DATA */}
          <section className="col-span-12 md:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col gap-8">
              <div className="flex items-center gap-2 font-black text-[11px] uppercase tracking-[0.25em] text-slate-400">
                <Info size={14} className="text-blue-600" /> Core Intelligence
              </div>
              
              <div className="space-y-6">
                <AboutField label="Direct Email" name="email" value={lead.email} onChange={handleChange} isEditing={isEditing} icon={<Mail size={16}/>} />
                <AboutField label="Primary Contact" name="phone" value={lead.phone} onChange={handleChange} isEditing={isEditing} icon={<Phone size={16}/>} />
                <AboutField label="Lead Source" name="source" value={lead.source} onChange={handleChange} isEditing={isEditing} icon={<Globe size={16}/>} />
                <AboutField label="Relationship Manager" name="assigned" value={lead.assigned} onChange={handleChange} isEditing={isEditing} icon={<ShieldCheck size={16}/>} />
              </div>
            </div>
          </section>

          {/* COLUMN 2: ACTIVITY & METRICS */}
          <section className="col-span-12 md:col-span-7 space-y-6">
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl w-fit mb-4">
                    <History size={22} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Modified</p>
                  <p className="font-bold text-slate-800 mt-1">{lead.updated_at || "Just now"}</p>
               </div>
               
               <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
                  <div className="p-2.5 bg-slate-100 text-slate-600 rounded-2xl w-fit mb-4">
                    <Activity size={22} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Reference</p>
                  <p className="font-mono font-bold text-slate-700 mt-1 text-xs">#{id?.slice(-8).toUpperCase()}</p>
               </div>
            </div>

            {/* REVENUE SECTION */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                  Deal Valuation Profile
                </label>
                {!isEditing && <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-lg">LIVE QUOTE</span>}
              </div>
              
              <div className={`flex items-center p-6 rounded-2xl border-2 transition-all duration-300 ${isEditing ? 'border-blue-500 bg-blue-50/30' : 'border-slate-50 bg-slate-50/50'}`}>
                <DollarSign size={32} className={`${isEditing ? 'text-blue-600' : 'text-slate-400'} font-bold transition-colors`} />
                <input 
                  name="value" 
                  type="text"
                  value={lead.value} 
                  onChange={handleChange} 
                  disabled={!isEditing} 
                  className="bg-transparent w-full font-black text-4xl outline-none px-4 text-slate-800 disabled:opacity-100 placeholder-slate-300" 
                  placeholder="0.00"
                />
              </div>
              
              <div className="mt-6 flex items-start gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                <Info size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  The projected revenue value is calculated based on current pipeline settings. 
                  Update this figure as negotiations progress to maintain accurate forecasting.
                </p>
              </div>
            </div>
          </section>

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

/** 
 * REUSABLE COMPONENT FOR DATA FIELDS
 */
function AboutField({ label, name, value, onChange, isEditing, icon }) {
  return (
    <div className="flex flex-col gap-2 group">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 group-hover:text-blue-600 transition-colors duration-300">
        {icon} {label}
      </label>
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={!isEditing}
        className={`w-full px-4 py-3 text-sm font-bold transition-all outline-none border-b-2 rounded-t-xl ${
          isEditing 
            ? 'border-blue-500 bg-blue-50/40 text-slate-900' 
            : 'border-slate-50 bg-transparent text-slate-700'
        }`}
      />
    </div>
  );
}