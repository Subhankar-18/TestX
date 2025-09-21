import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages to navigated
import Homepage from './HomePage.jsx'; 
import Signup from "./SignUp.jsx"; 
import Signin from './Signin.jsx';
import Adminpage from './Admin/AdminPage.jsx';
import Adminprofile from './Admin/AdminProfile.jsx';
import Category from './Admin/Category.jsx';
import Quiz from './Admin/Quiz.jsx';
import Normalpage from './normal/Normalpage.jsx'; 
import Normalprofile from './normal/Normalprofile.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Aboutus from "./AboutUs.jsx";
import Contact from "./ContactUs.jsx";
import QuestionPage from './Admin/QuestionPage.jsx';
import QuizzesByCategoryPage from './normal/QuizzesByCategoryPage.jsx'; 
import QuizTakingPage from './normal/QuizTakingPage.jsx'; 

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
            <Route path="/userprofile" element={<Normalprofile />} />
            <Route path="/normal/category/:cid" element={<QuizzesByCategoryPage />} />
            <Route path="/normal/quiz/:qid" element={<QuizTakingPage />} />
          </Route>

          {/* Protected Routes - Admin */}
          <Route element={<PrivateRoute requiredRole="ADMIN" />}>
            <Route path="/adminpage" element={<Adminpage />} />
            <Route path="/adminprofile" element={<Adminprofile />} />
            <Route path="/category" element={<Category />} />
            <Route path="/quiz" element={<Quiz/>} />
            <Route path="/questions" element={<QuestionPage />} />
            <Route path="/questions/:qid" element={<QuestionPage />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;