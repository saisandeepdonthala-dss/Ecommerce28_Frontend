import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

 
const admin = JSON.parse(
  localStorage.getItem("admin") || "{}"
);

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      

      <div className="dashboard-container">
        <div className="dashboard-card">

          <h1 className="dashboard-title">
            User Dashboard
          </h1>


<h3 className="welcome-text">
  Welcome: {admin?.adminemail}
</h3>

<p className="user-info mt-3">
  <strong>Name:</strong> {admin?.adminname}
</p>
          <button
            className="dashboard-btn mt-4"
            onClick={() => navigate("/products")}
          >
            View Products
          </button>

        </div>
      </div>
    </>
  );
}

export default Dashboard;