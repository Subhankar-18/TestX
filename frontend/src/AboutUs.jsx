import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs.css";

function AboutUs() {
  const bgImage = process.env.PUBLIC_URL + "/images/about.jpg"; // hero image

  return (
    <div className="aboutus-page">
      {/* Hero Section */}
      <div
        className="aboutus-hero d-flex align-items-center justify-content-center"
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
          <h1 className="fw-bold">About Us</h1>
          <p>
            <a href="/" className="breadcrumb-link">
              Home
            </a>{" "}
            &gt; About Us
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left side QUOTE instead of images */}
          <div className="col-md-6 d-flex justify-content-center">
            <div className="quote-box p-4 rounded shadow text-center bg-light">
                <blockquote className="blockquote mb-0">
                <p className="mb-3 fst-italic">
                    "An investment in knowledge pays the best interest."
                </p>
                <footer className="blockquote-footer mt-2">
                    Benjamin Franklin
                </footer>
                </blockquote>
            </div>
          </div>

          {/* Right side content */}
          <div className="col-md-6">
            <h5 className="text-uppercase text-muted">About Us</h5>
            <h2 className="fw-bold">
              Creating Seamless Exam Experience <br />
            </h2>
            <p className="text-muted">
              We want to provide a smart and secure online exam solution that
              benefits both students and institutions. From seamless exam
              creation to real-time evaluation — with a focus on reliability,
              accessibility, and innovation, we ensure smooth assessments
              anytime, anywhere.
            </p>
            <ul className="list-unstyled">
              <li>✔ Secure platform</li>
              <li>✔ Real-time results</li>
              <li>✔ Accessible Anywhere</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
