import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./Signin.css"; 

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const tokenResponse = await axios.post(
        "http://localhost:8080/generate-token",
        { username, password }
      );
      const { token } = tokenResponse.data;
      localStorage.setItem("token", token);

      const userResponse = await axios.get(
        `http://localhost:8080/user/${username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const userRole = userResponse.data.authorities[0].authority;
      localStorage.setItem("role", userRole);

      if (userRole === "NORMAL") {
        navigate("/normalpage");
      } else if (userRole === "ADMIN") {
        navigate("/adminpage");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
      alert("Sign-in failed. Please check your username and password.");
    }
  };

  return (
    <div className="signin-page">
      {/* Top header with brand */}
      <div className="signin-header">
        <Link to="/" className="brand-text">
          TestX
        </Link>
      </div>

      {/* Main container */}
      <div className="signin-container">
        {/* Left Image Section */}
        <div className="image-section">
          <img
            src="/images/login.jpg"
            alt="Login"
            className="login-image"
          />
        </div>

        {/* Right Form Section */}
        <div className="form-section">
          <div className="form-card">
            <h2 className="title">Sign In</h2>
            <form onSubmit={handleSignin} className="signin-form">
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="input-field"
                />
              </div>

              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button type="submit" className="signin-btn">
                Sign In
              </button>
            </form>

            <p className="signup-text">
              Don’t have an account?{" "}
              <Link to="/signup" className="signup-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
