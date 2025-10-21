import React, { useEffect, useState } from "react";
import "./Normalpage.css";

const photos = [
  process.env.PUBLIC_URL + "/images/user.png",
  process.env.PUBLIC_URL + "/images/user1.jpeg",
];

function Normalprofile() {
  const storedUsername = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !storedUsername) {
      window.location.href = "/signin";
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/user/${storedUsername}`, {//
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    })
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data) => {
        if (!data.photo) data.photo = photos[Math.floor(Math.random() * photos.length)];
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch(() => { localStorage.clear(); window.location.href = "/signin"; })
      .finally(() => setLoading(false));
  }, [storedUsername, token]);

  const changePhoto = () => {
    const newPhoto = photos[Math.floor(Math.random() * photos.length)];
    setUser(prev => ({ ...prev, photo: newPhoto }));
    localStorage.setItem("user", JSON.stringify({ ...user, photo: newPhoto }));
  };

  if (loading || !user) return <div className="normal-container d-flex justify-content-center align-items-center vh-100"><h3>Loading profile...</h3></div>;

  return (
    <div className="admin-container d-flex">
      {/* Sidebar */}
      <div className="sidebar p-3">
        <ul className="nav flex-column mt-2">
          <li className="nav-item mb-2">
            <a href="/normalpage" className="nav-link">
              <i className="bi bi-house-door me-2"></i> Home
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/userprofile" className="nav-link active">
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
          <h4 className="welcome-text">Welcome, {user.firstName} {user.lastName}</h4>
        </nav>

        <div className="profile-card card shadow-lg">
          <img src={user.photo} alt="Profile" />
          <h4>{user.firstName} {user.lastName}</h4>
          <p className="text-muted">@{user.username}</p>
          <div className="mt-3">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
          <button className="btn btn-outline-primary" onClick={changePhoto}>Change Photo</button>
        </div>
      </div>
    </div>
  );
}

export default Normalprofile;
