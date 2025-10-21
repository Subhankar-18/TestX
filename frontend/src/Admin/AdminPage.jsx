import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";

function AdminPage() {
  const storedUsername = localStorage.getItem("username") || "Admin";
  const token = localStorage.getItem("token"); // JWT token
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  
    // If token does match localstorage redirect
  useEffect(() => {
    if (!token) {
      console.error("No token found in localStorage");
      window.location.href = "/signin";
      return;
    }

      // Fetch api to get user details
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${storedUsername}`, {//
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((err) => {
        console.error("Error fetching admin data:", err);
        localStorage.clear();
        window.location.href = "/signin";
      })
      .finally(() => setLoading(false));
  }, [storedUsername, token]);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar p-3">
        <ul className="nav flex-column mt-2">
          <li className="nav-item mb-2">
            <a href="/adminpage" className="nav-link active">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/category" className="nav-link">
              <i className="bi bi-tags me-2"></i> Category
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/quiz" className="nav-link">
              <i className="bi bi-pencil-square me-2"></i> Quiz
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/questions" className="nav-link">
              <i className="bi bi-question-circle me-2"></i> Questions
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/adminprofile" className="nav-link">
              <i className="bi bi-person-circle me-2"></i> Profile
            </a>
          </li>
          <li className="nav-item mt-3">
            <button
              className="btn btn-outline-light w-100 d-flex align-items-center justify-content-start"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/signin";
              }}
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content flex-grow-1">
        <nav className="admin-top-navbar">
          <h2 className="welcome-text">
            {loading
              ? "Loading..."
              : `Welcome, ${admin?.firstName ?? ""} ${admin?.lastName ?? ""} 👋`}
          </h2>
        </nav>

        {/* Quick Actions Section */}
        <div className="quick-actions container">
          <h4 className="mb-4">Quick Actions</h4>
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="card action-card shadow-sm text-center">
                <div className="card-body">
                  <i className="bi bi-plus-circle action-icon"></i>
                  <h5 className="card-title">Create Quiz</h5>
                  <a href="/quiz" className="btn btn-outline-primary btn-sm">
                    Go
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card action-card shadow-sm text-center">
                <div className="card-body">
                  <i className="bi bi-folder-plus action-icon"></i>
                  <h5 className="card-title">Add Category</h5>
                  <a href="/category" className="btn btn-outline-primary btn-sm">
                    Go
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card action-card shadow-sm text-center">
                <div className="card-body">
                  <i className="bi bi-question-circle action-icon"></i>
                  <h5 className="card-title">Add Questions</h5>
                  <a href="/questions" className="btn btn-outline-primary btn-sm">
                    Go
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;