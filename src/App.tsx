import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Characters from "./pages/characters";
import CharacterDetails from "./pages/CharacterDetails";
import Locations from "./pages/locations";
import LocationDetails from "./pages/LocationDetails";
import Episodes from "./pages/episodes";
import EpisodeDetails from "./pages/EpisodeDetails/EpisodeDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/characters" replace />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/character/:id" element={<CharacterDetails />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/location/:id" element={<LocationDetails />} />
            <Route path="/episodes" element={<Episodes />} />
            <Route path="/episode/:id" element={<EpisodeDetails />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
