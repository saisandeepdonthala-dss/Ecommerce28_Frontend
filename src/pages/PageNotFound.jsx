import React from "react";
import { Link } from "react-router-dom";
import "./pagenotfound.css";

function PageNotFound() {
  return (
    <>
      {/* Bootstrap 5.0.2 */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

    

      <div className="notfound-page">

        <div className="notfound-card">

          <h1 className="error-code">
            404
          </h1>

          <h2 className="error-title">
            Page Not Found
          </h2>

          <p className="error-text">
            The page you are looking for does not exist or has been moved.
          </p>

          <Link to="/" className="home-btn">
            Back To Home
          </Link>

        </div>

      </div>
    </>
  );
}

export default PageNotFound;