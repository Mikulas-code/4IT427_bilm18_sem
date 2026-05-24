import { NavLink } from "react-router-dom";
import { BirdListPage } from "./pages/BirdListPage";
import { BirdDetailPage } from "./pages/BirdDetailPage";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <main>
      <nav>
        <NavLink to="/">
        Seznam ptáků
        </NavLink>
      </nav>


      <Routes>
        <Route path="/" element={<BirdListPage />} />
        <Route path="/birds/:id" element={<BirdDetailPage />} />
      </Routes>


    </main>
        
  );
}

export default App;
