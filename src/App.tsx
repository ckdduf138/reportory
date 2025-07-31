import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CategoryControl from "./pages/CategoryControl";
import StatsPage from "./pages/StatsPage";
import SharePage from "./pages/SharePage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<CategoryControl />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
