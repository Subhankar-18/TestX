import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

function Homepage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgImage = process.env.PUBLIC_URL + '/images/bg.jpg';

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg custom-navbar px-4 ${scrolled ? 'scrolled' : ''}`}>
        <a className="navbar-brand" href="/">TestX</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link signin" to="/signin">Sign In</Link></li>
            <li className="nav-item"><Link className="nav-link signup" to="/signup">Sign Up</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="hero d-flex flex-column justify-content-center align-items-center text-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100%',
          position: 'relative'
        }}
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to TestX</h1>
          <p className="hero-subtitle">Smart, Secure & Instant Exams Anytime, Anywhere..Be a PRO</p>
          <div className="mt-4">
            <button className="btn btn-warning btn-lg mx-2" onClick={() => navigate('/signin')}>Sign In</button>
            <button className="btn btn-danger btn-lg mx-2" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <section className="features-section">
        <div className="container text-center py-5">
          <h2 className="mb-4 text-white">Why Choose TestX?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5 className="card-title">Secure Exams</h5>
                  <p className="card-text">All exams are conducted with strict security and fairness.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5 className="card-title">Instant Results</h5>
                  <p className="card-text">Get results immediately after completing the test.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5 className="card-title">Progress Tracking</h5>
                  <p className="card-text">Track your performance and improve with detailed analytics.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        © 2025 TestX 
      </footer>
    </div>
  );
}

export default Homepage;
