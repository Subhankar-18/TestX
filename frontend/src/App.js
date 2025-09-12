// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Corrected import statements to match your file names (e.g., HomePage.jsx)
import Homepage from './HomePage.jsx'; 
import Signup from "./SignUp.jsx"; 
import Signin from './Signin.jsx';
import Adminpage from './Adminpage.jsx';
import Normalpage from './Normalpage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Aboutus from "./AboutUs.jsx";
import Contact from "./ContactUs.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/unauthorized" element={<div>Access Denied. You do not have the required permissions.</div>} />

        {/* Protected Routes - Role-based access */}
        <Route element={<PrivateRoute requiredRole="NORMAL" />}>
          <Route path="/normalpage" element={<Normalpage />} />
        </Route>
        
        <Route element={<PrivateRoute requiredRole="ADMIN" />}>
          <Route path="/adminpage" element={<Adminpage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;