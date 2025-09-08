import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./HomePage";//redirecting to homepage
import Signup from "./SignUp";//redirecting to signup page
import Aboutus from "./AboutUs";//redirecting to about us page
import Contact from "./ContactUs";//redirecting to contact page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<Aboutus />} />
         <Route path="/contact" element={<Contact />} />
  
        {/* Add More pages */}
      </Routes>
    </Router>
  );
}

export default App;
