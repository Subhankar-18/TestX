import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bgImage = process.env.PUBLIC_URL + "/images/signup.jpg";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email.includes("@")) {
      setError("Invalid email address");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Phone number must be 10 digits");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/`, {//
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        alert("Signup successful! Redirecting to Sign In...");
        window.location.href = "/signin";
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try later.");
      console.error("Signup error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="signup-container">
      {/* Left side background photo */}
      <div
        className="signup-image"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>

      {/* Right side with signup form */}
      <div className="signup-form d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white w-75">
          <h3 className="text-center mb-4">Create Account</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Enter a First name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Enter a Last name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Enter a unique username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="example@email.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Please enter 10 digits"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              required
              placeholder="Must be atleast 6 characters"
            />
          </div>

          <button type="submit" className="btn btn-signup w-100" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="text-center mt-3">
            <small>
              Already have an account? <a href="/signin">Sign In</a>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
