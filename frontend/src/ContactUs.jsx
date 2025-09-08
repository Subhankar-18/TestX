import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactUs.css";

function ContactUs() {
  const bgImage = process.env.PUBLIC_URL + "/images/contact.jpg"; // hero image

  return (
    <div className="contactus-page">
      {/* Hero Section */}
      <div
        className="contactus-hero d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          position: "relative",
          color: "white",
        }}
      >
        <div className="overlay"></div>
        <div className="text-center position-relative">
          <h1 className="fw-bold">Contact Us</h1>
          <p>
            <a href="/" className="breadcrumb-link">
              Home
            </a>{" "}
            &gt; Contact Us
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left side: Contact Info */}
          <div className="col-md-6 d-flex justify-content-center">
            <div className="info-box p-4 rounded shadow text-center bg-light">
              <h5 className="mb-3">Get in Touch</h5>
              <p><strong>Email:</strong>support@testx.com</p>
              <p><strong>Phone:</strong> +91 12345 67890</p>
              <p><strong>Address:</strong>13 Main Street, City, India</p>
              
            
            </div>
          </div>

          {/* Right side: Quote / Message */}
          <div className="col-md-6 d-flex justify-content-center">
            <div className="quote-box p-4 rounded shadow text-center bg-light">
              <blockquote className="blockquote mb-0">
                <p className="mb-3 fst-italic">
                  "Exams should measure knowledge, not stress."
                </p>
                <footer className="blockquote-footer mt-2">
                  TestX Team
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
