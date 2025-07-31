import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CategoryControl from "./pages/CategoryControl";
import StatsPage from "./pages/StatsPage";

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<CategoryControl />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
