import React from "react";
import "./home.css";

function Contact() {
  return (
    <div className="contact-page" style={{ padding: "80px 20px", minHeight: "60vh" }}>
      <div className="container">
        <h1 style={{ color: "#38bdf8", marginBottom: 20 }}>Contact Us</h1>
        <div style={{ color: "#94a3b8", maxWidth: 800 }}>
          <p>Email: support@shopease.com</p>
          <p>Phone: +91 9810231998</p>
          <p>Location: India</p>
          <p>
            For general inquiries or support, please email us and we'll get
            back to you within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
