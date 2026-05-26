import { Navigate, NavLink } from "react-router-dom";
import { BirdListPage } from "./pages/BirdListPage";
import { BirdDetailPage } from "./pages/BirdDetailPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-900 border-b border-gray-700 px-6 py-3 flex justify-between items-center">
        <span className="text-green-400 font-bold text-xl">🦅 BirdWatch</span>
        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-green-400 font-medium" : "text-gray-400 hover:text-green-400"
            }
          >
            Seznam ptáků
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<BirdListPage />} />
        <Route path="/birds/:id" element={<BirdDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
