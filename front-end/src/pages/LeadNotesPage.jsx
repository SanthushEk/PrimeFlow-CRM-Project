import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ArrowLeft,
  Plus,
  Calendar,
  User,
  Search,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

import NewNote from "../components/leads/NewNote";
import DeleteNotesModel from "../components//common/DeleteNotesModal";

export default function LeadNotesPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // DELETE STATES
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // NOTIFICATION
  const [notification, setNotification] = useState({
    open: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    fetchNotes();
  }, [id]);

  // =========================
  // FETCH NOTES
  // =========================
  const fetchNotes = async () => {
    try {
      console.log("📥 Fetching notes...");

      const res = await axios.get(
        `http://localhost:5000/api/leads/${id}/notes`
      );

      console.log("✅ Notes loaded:", res.data);

      setNotes(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch notes:", err);

      showNotification("error", "Failed to load notes");
    }
  };

  // =========================
  // ADD NOTE
  // =========================
  const handleNewNote = (newNote) => {
    console.log("🆕 New note added:", newNote);

    setNotes((prev) => [newNote, ...prev]);

    showNotification("success", "Note added successfully");
  };

  // =========================
  // DELETE CLICK
  // =========================
  const handleDeleteClick = (note) => {
    console.log("🗑 Delete clicked:", note);

    setSelectedNote(note);
    setDeleteModal(true);
  };

  // =========================
  // DELETE NOTE
  // =========================
  const confirmDelete = async () => {
    try {
      setDeleting(true);

      console.log("🚨 Deleting note:", selectedNote);

      await axios.delete(
        `http://localhost:5000/api/notes/${selectedNote.id}`
      );

      console.log("✅ Note deleted successfully");

      setNotes((prev) =>
        prev.filter((item) => item.id !== selectedNote.id)
      );

      setDeleteModal(false);
      setSelectedNote(null);

      showNotification("success", "Note deleted successfully");
    } catch (err) {
      console.error("❌ Delete failed:", err);

      showNotification("error", "Failed to delete note");
    } finally {
      setDeleting(false);
    }
  };

  // =========================
  // NOTIFICATION
  // =========================
  const showNotification = (type, message) => {
    setNotification({
      open: true,
      type,
      message,
    });

    setTimeout(() => {
      setNotification({
        open: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredNotes = notes.filter(
    (n) =>
      n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">

      {/* ========================= */}
      {/* NOTIFICATION */}
      {/* ========================= */}
      {notification.open && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`px-5 py-3 rounded-xl shadow-xl text-white font-semibold ${
              notification.type === "success"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* SIDEBAR */}
      {/* ========================= */}
      <aside className="w-full md:w-20 bg-primary flex flex-row md:flex-col items-center py-6 px-4 md:px-0 border-r border-black/10">

        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all mb-0 md:mb-8"
        >
          <ArrowLeft size={24} />
        </button>

      </aside>

      {/* ========================= */}
      {/* MAIN */}
      {/* ========================= */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white border-b-2 border-slate-200 px-8 py-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            <div>
              <nav className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-1">
                <span>Leads</span>
                <span className="text-slate-300">/</span>
                <span>Notes</span>
              </nav>

              <h1 className="text-3xl font-black text-slate-900 leading-none">
                Lead Journal
              </h1>
            </div>

            {/* ADD BUTTON */}
            <button
              onClick={() => setOpenModal(true)}
              className="bg-primary hover:brightness-110 text-white px-6 py-3 rounded-none font-bold flex items-center gap-3 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Plus size={20} strokeWidth={3} />
              NEW ENTRY
            </button>

          </div>

        </header>

        {/* CONTENT */}
        <main className="p-8 max-w-6xl w-full mx-auto">

          {/* SEARCH */}
          <div className="relative mb-10">

            <input
              type="text"
              placeholder="Search in records..."
              className="w-full pl-14 pr-4 py-4 bg-white border-2 border-slate-200 text-slate-800 font-medium focus:outline-none focus:border-primary transition-colors shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={22}
            />

          </div>

          {/* EMPTY STATE */}
          {filteredNotes.length === 0 ? (
            <div className="bg-slate-200/50 border-4 border-dashed border-slate-300 p-16 text-center">

              <h3 className="text-xl font-bold text-slate-500 italic">
                No notes found for this lead
              </h3>

            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">

              {filteredNotes.map((n) => (
                <div
                  key={n.id}
                  className="bg-white border-l-8 border-primary border-t border-r border-b p-6 shadow-sm flex flex-col md:flex-row gap-6 group hover:shadow-md transition-shadow"
                >

                  {/* DATE */}
                  <div className="md:w-32 flex-shrink-0">

                    <div className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">
                      Created
                    </div>

                    <div className="text-sm font-bold text-slate-900 leading-tight">
                      {new Date(n.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </div>

                    <div className="text-xs text-slate-500">
                      {new Date(n.created_at).getFullYear()}
                    </div>

                  </div>

                  {/* INFO */}
                  <div className="flex-1">

                    <div className="flex justify-between items-start">

                      <h2 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-primary transition-colors italic">
                        {n.title}
                      </h2>

                      <div className="flex items-center gap-2">

                        <button className="text-slate-300 hover:text-slate-600">
                          <MoreHorizontal size={20} />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDeleteClick(n)}
                          className="text-red-400 hover:text-red-600 transition"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </div>

                    <p className="text-slate-600 font-medium leading-relaxed mb-4">
                      {n.content}
                    </p>

                    <div className="flex items-center gap-6 pt-4 border-t border-slate-100">

                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                        <User size={14} className="text-primary" />
                        <span>{n.created_by || "Admin"}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                        <Calendar size={14} className="text-primary" />
                        <span>
                          {new Date(n.created_at).toLocaleString()}
                        </span>
                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </main>

      </div>

      {/* ========================= */}
      {/* NEW NOTE MODAL */}
      {/* ========================= */}
      <NewNote
        leadId={id}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={handleNewNote}
      />

      {/* ========================= */}
      {/* DELETE MODAL */}
      {/* ========================= */}
      <DeleteNotesModel
        open={deleteModal}
        loading={deleting}
        onCancel={() => setDeleteModal(false)}
        onConfirm={confirmDelete}
      />

    </div>
  );
}