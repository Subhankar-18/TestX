import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Homepage from './HomePage.jsx'; 
import Signup from "./SignUp.jsx"; 
import Signin from './Signin.jsx';
import Adminpage from './Admin/AdminPage.jsx';
import Adminprofile from './Admin/AdminProfile.jsx';
import Category from './Admin/Category.jsx';
import Quiz from './Admin/Quiz.jsx';
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

          {/* Protected Routes - Normal User */}
          <Route element={<PrivateRoute requiredRole="NORMAL" />}>
            <Route path="/normalpage" element={<Normalpage />} />
          </Route>

          {/* Protected Routes - Admin */}
          <Route element={<PrivateRoute requiredRole="ADMIN" />}>
            <Route path="/adminpage" element={<Adminpage />} />
            <Route path="/adminprofile" element={<Adminprofile />} />
            <Route path="/category" element={<Category />} />
            <Route path="/quiz" element={<Quiz/>} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
