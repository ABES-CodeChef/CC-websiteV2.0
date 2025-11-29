import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventPage";
import TeamPage from "./pages/TeamPage";

import CodeClash2024Page from "./pages/CodeClash2024Page";
import RustEdPage from "./pages/RustEdPage";
import OnceUponACrimePage from "./pages/OnceUponACrimePage";
import TError3Page from "./pages/TError3Page";
import ByondCodePage from "./pages/ByondCodePage";
import HeadNodePage from "./pages/HeadNodePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/events" element={<EventsPage />} />
        <Route path="/team" element={<TeamPage />} />

        <Route path="/events/codeclash-2024" element={<CodeClash2024Page />} />
        <Route path="/events/rust-ed" element={<RustEdPage />} />
        <Route path="/events/once-upon-a-crime" element={<OnceUponACrimePage />} />
        <Route path="/events/t-error-3" element={<TError3Page />} />
        <Route path="/events/byond-code" element={<ByondCodePage />} />
        <Route path="/events/head-node" element={<HeadNodePage />} />
      </Routes>
    </>
  );
}

export default App;