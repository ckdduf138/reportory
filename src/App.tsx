import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryControl from './pages/CategoryControl';

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/category' element={<CategoryControl />} />
      </Routes>
    </Router>
  );
};

export default App;
