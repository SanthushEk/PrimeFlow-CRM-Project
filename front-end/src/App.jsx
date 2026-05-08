import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadDetails from "./pages/LeadDetails";
import LeadNotesPage from "./pages/LeadNotesPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===================== */}
        {/* PUBLIC ROUTE */}
        {/* ===================== */}
        <Route path="/" element={<Login />} />

        {/* ===================== */}
        {/* PROTECTED ROUTES */}
        {/* ===================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/:id"
          element={
            <ProtectedRoute>
              <LeadDetails />
            </ProtectedRoute>
          }
        />

        {/* ✅ FIXED: PROTECT NOTES PAGE */}
        <Route
          path="/leads/:id/notes"
          element={
            <ProtectedRoute>
              <LeadNotesPage />
            </ProtectedRoute>
          }
        />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;