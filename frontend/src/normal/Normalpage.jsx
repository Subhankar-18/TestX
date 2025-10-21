import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Normalpage.css"; 

function NormalPage() {
  const storedUsername = localStorage.getItem("username") || "User";
  const token = localStorage.getItem("token"); 
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      window.location.href = "/signin";
      return;
    }
    fetchCategories();
  }, [fetchCategories, token]);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar p-3">
        <ul className="nav flex-column mt-2">
          <li className="nav-item mb-2">
            <a href="/normalpage" className="nav-link active">
              <i className="bi bi-house-door me-2"></i> Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/userprofile" className="nav-link">
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
            {loading ? "Loading..." : `Welcome, ${storedUsername} 👋`}
          </h2>
        </nav>

        <div className="quick-actions container">
          <h4 className="mb-4">Select a Category</h4>

          {loading && <h5>Loading categories...</h5>}
          {error && <h5 className="text-danger">{error}</h5>}

          <div className="row">
            {categories.map((category) => (
              <div className="col-md-3 mb-3" key={category.cid}>
                <div className="card action-card shadow-sm text-center">
                  <div className="card-body">
                    <i className="bi bi-tags action-icon"></i>
                    <h5 className="card-title">{category.title}</h5>
                    <p className="card-text">{category.description}</p>
                    <Link
                      to={`/normal/category/${category.cid}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Go
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {categories.length === 0 && !loading && !error && (
              <p>No categories available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NormalPage;
