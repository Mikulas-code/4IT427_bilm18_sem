import { NavLink } from "react-router-dom";
import { BirdListPage } from "./pages/BirdListPage";
import { BirdDetailPage } from "./pages/BirdDetailPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Routes>
        <Route path="/" element={<BirdListPage />} />
        <Route path="/birds/:id" element={<BirdDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
