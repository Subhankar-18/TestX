import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminProfile.css";

const photos = [
  process.env.PUBLIC_URL + "/images/admin.png",
  process.env.PUBLIC_URL + "/images/admin2.jpg",
  process.env.PUBLIC_URL + "/images/admin3.png",
];

function AdminProfile() {
  const storedUsername = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("storedUsername:", storedUsername, "token:", token);

    // If token does match localstorage redirect
    if (!token || !storedUsername) {
      console.log("Redirecting to signin page");
      window.location.href = "/signin";
      return;
    }

    // Fetch api to get user details
    fetch(`http://localhost:8080/user/${storedUsername}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or failed request");
        }
        return res.json();
      })
      .then((data) => {
        // placeholder photo
        if (!data.photo) {
          data.photo = photos[Math.floor(Math.random() * photos.length)];
        }
        setAdmin(data);
        localStorage.setItem("admin", JSON.stringify(data));
      })
      .catch((err) => {
        console.error("Error fetching admin:", err);
        // Clear local storage and redirect only on error
        localStorage.clear();
        window.location.href = "/signin";
      })
      .finally(() => setLoading(false));
  }, [storedUsername, token]); 

  const changePhoto = () => {
    const newPhoto = photos[Math.floor(Math.random() * photos.length)];
    const updated = { ...admin, photo: newPhoto };
    setAdmin(updated);
    localStorage.setItem("admin", JSON.stringify(updated));
  };

  if (loading || !admin) {
    return (
      <div className="admin-container d-flex justify-content-center align-items-center vh-100">
        <h3>Loading admin profile...</h3>
      </div>
    );
  }

  return (
    <div className="admin-container d-flex">
      {/* Sidebar */}
      <div className="sidebar p-3">
        <ul className="nav flex-column mt-2">
          <li className="nav-item mb-2">
            <a href="/adminpage" className="nav-link">
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
            <a href="/adminprofile" className="nav-link active">
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
        <nav className="admin-top-navbar shadow-sm px-4 py-3 mb-4">
          <h4 className="welcome-text">
            Welcome, {admin.firstName} {admin.lastName}
          </h4>
        </nav>

        <div className="profile-card card shadow-lg p-4 mt-4 mx-auto text-center">
          <img
            src={admin.photo}
            alt="Profile"
            className="rounded-circle"
            width="120"
            height="120"
          />
          <h4>
            {admin.firstName} {admin.lastName}
          </h4>
          <p className="text-muted">@{admin.username}</p>

          <div className="mt-3">
            <p>
              <strong>Email:</strong> {admin.email}
            </p>
            <p>
              <strong>Phone:</strong> {admin.phone}
            </p>
          </div>

          <button
            className="btn btn-outline-primary mt-3"
            onClick={changePhoto}
          >
            Change Photo
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;