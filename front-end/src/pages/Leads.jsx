import React, { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Footer from "../components/layout/Footer";

import LeadFilters from "../components/leads/LeadFilters";
import LeadTable from "../components/leads/LeadTable";
import LeadCards from "../components/leads/LeadCard";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [openModal, setOpenModal] = useState(false);

  // LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/leads` );
      setLeads(res.data || []);
    };

    fetchData();
  }, []);

  // NORMALIZE
  const normalize = (v) =>
    String(v || "").toLowerCase().trim();

  // FILTER LOGIC
  const filteredLeads = leads.filter((lead) => {
    const name = normalize(lead.name);
    const status = normalize(lead.status);

    const searchTerm = normalize(search);
    const statusTerm = normalize(statusFilter);

    const matchSearch =
      searchTerm === "" || name.includes(searchTerm);

    const matchStatus =
      statusTerm === "" || status === statusTerm;

    return matchSearch && matchStatus;
  });

  // ADD LEAD
  const handleAddLead = (newLead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  // DELETE LEAD
  const handleDelete = (id) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-slate-100">

      <Sidebar />

      <div className="flex-1 lg:ml-64">

        <Topbar />

        <div className="pt-24 px-4 md:px-8 lg:px-10">


          {/* CARDS */}
          <LeadCards leads={leads} />

          {/* FILTERS */}
          <LeadFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* TABLE */}
          <LeadTable
            leads={filteredLeads}
            setLeads={setLeads}
            onAdd={() => setOpenModal(true)}
            onDelete={handleDelete}
            openModal={openModal}
            setOpenModal={setOpenModal}
            onAddLead={handleAddLead}
          />

          <Footer />

        </div>
      </div>
    </div>
  );
}