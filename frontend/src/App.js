import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./HomePage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
  
        {/* Add Register page later */}
      </Routes>
    </Router>
  );
}

export default App;
