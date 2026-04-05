import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

function Homepage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

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

      {/* Main Navbar */}
<nav className={`navbar navbar-expand-lg main-navbar px-4 py-3 ${scrolled ? 'scrolled' : ''}`}>
  <div className="container-fluid">
    <Link className="navbar-brand text-white fw-bold" to="/">
      TestX
    </Link>


    {/* Navbar Links */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/aboutus">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Right side buttons */}
      <div className="d-flex align-items-center ms-lg-3">
        <Link className="btn btn-outline-light me-2" to="/signin">Sign In</Link>
        <Link className="btn btn-outline-light me-2" to="/signup">Sign Up</Link>
      </div>
    </div>
  </div>
</nav>


      {/* Hero Section */}
      <div
        className="hero d-flex flex-column justify-content-center align-items-center text-center text-white"
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
        <div className="hero-overlay"></div>
        <div className="container hero-content-container">
          <h1 className="hero-main-title">Welcome to TestX</h1>
          <p className="hero-description">Smart, Secure & Instant Exams Anytime, Anywhere..Be a PRO</p>
          <div className="mt-4">
            <button className="btn btn-primary-theme" onClick={() => navigate('/signin')}>Get Started!</button>
          </div>
        </div>
      </div>

      {/* Features Section*/}
      <section className="services-overview-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 text-navy">Why Choose TestX?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="service-card shadow h-100 p-4">
                <h5 className="service-card-title text-deep-green">Secure Exams</h5>
                <p className="service-card-text text-dark">All exams are conducted with strict security and fairness.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card shadow h-100 p-4">
                <h5 className="service-card-title text-deep-green">Instant Results</h5>
                <p className="service-card-text text-dark">Get results immediately after completing the test.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card shadow h-100 p-4">
                <h5 className="service-card-title text-deep-green">Progress Tracking</h5>
                <p className="service-card-text text-dark">Track your performance and improve with detailed analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-corporate text-white py-4">
        <div className="container text-center">
          © 2025 TestX. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Homepage;