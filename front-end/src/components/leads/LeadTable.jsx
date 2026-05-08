import React, { useState } from "react";
import axios from "axios";
import {
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  ExternalLink
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import LeadFormModal from "../leads/LeadFormModel";
import DeleteConfirmModal from "../common/DeleteConfirmModel";

export default function LeadTable({
  leads = [],
  onDelete,
  openModal,
  setOpenModal,
  onAddLead,
  onAdd
}) {
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      axios.delete(`${import.meta.env.VITE_API_URL}/api/leads/${selectedId}`);
      onDelete(selectedId);
      setDeleteModal(false);
      setSelectedId(null);
    } catch (err) {
      console.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentLeads = leads.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(leads.length / rowsPerPage) || 1;

  return (
    <div className="space-y-6 p-2 md:p-4">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold">Leads Table</h2>
          <p className="text-gray-500 text-sm">Manage CRM leads</p>
        </div>

        <button
          onClick={onAdd}
          className="w-full sm:w-auto flex justify-center items-center gap-2 bg-primary hover:bg-white border hover:border-primary hover:text-primary text-white px-4 py-2 rounded-xl transition-colors"
        >
          <Plus size={18} />
          <span>New Lead</span>
        </button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-xs uppercase text-gray-600 font-semibold">
            <tr>
              <th className="p-4 text-left">Name</th>
              {/* Hidden on mobile (hidden), shown on medium screens and up (md:table-cell) */}
              <th className="p-4 text-left hidden md:table-cell">Contact</th>
              <th className="p-4 text-left hidden sm:table-cell">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {currentLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-gray-900">{lead.name}</div>
                  {/* Subtext for mobile: show email under name only on small screens */}
                  <div className="text-xs text-gray-500 md:hidden">{lead.email}</div>
                </td>

                <td className="p-4 text-sm hidden md:table-cell">
                  {lead.email}
                </td>

                <td className="p-4 hidden sm:table-cell">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                    {lead.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/leads/${lead.id}`)}
                      className="p-1 hover:text-blue-600 transition-colors"
                      title="View Details"
                    >
                      <ExternalLink size={18} />
                    </button>

                    <button
                      onClick={() => handleDeleteClick(lead.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete Lead"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex items-center justify-between border-t p-4 bg-gray-50">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 rounded-lg hover:bg-white border disabled:opacity-30 transition-all"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 rounded-lg hover:bg-white border disabled:opacity-30 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <LeadFormModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={(newLead) => onAddLead(newLead)}
      />

      <DeleteConfirmModal
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onConfirm={confirmDelete}
        loading={deleting}
      />
    </div>
  );
}