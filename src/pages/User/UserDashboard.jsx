import React from "react";
import { useNavigate } from "react-router-dom";
import "./userdashboard.css";

function UserDashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const quickLinks = [
    {
      icon: "🛍️",
      title: "Browse Products",
      desc: "Explore our full catalogue",
      action: () => navigate("/produce"),
      color: "#6366f1",
      bg: "#eef2ff"
    },
    {
      icon: "🛒",
      title: "My Cart",
      desc: "View items in your cart",
      action: () => navigate("/cart"),
      color: "#0ea5e9",
      bg: "#e0f2fe"
    },
    {
      icon: "📦",
      title: "My Orders",
      desc: "Track your recent orders",
      action: () => navigate("/my-orders"),
      color: "#10b981",
      bg: "#d1fae5"
    },
    {
      icon: "👗",
      title: "Fashion",
      desc: "Trending styles just for you",
      action: () => navigate("/produce?category=Fashion"),
      color: "#f43f5e",
      bg: "#ffe4e6"
    },
    {
      icon: "📱",
      title: "Electronics",
      desc: "Latest gadgets & tech",
      action: () => navigate("/produce?category=Electronics"),
      color: "#f59e0b",
      bg: "#fef3c7"
    },
    {
      icon: "🏠",
      title: "Home Appliances",
      desc: "Everything for your home",
      action: () => navigate("/produce?category=home_appliences"),
      color: "#8b5cf6",
      bg: "#ede9fe"
    }
  ];

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      

      <div className="ud-page">
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>

          {/* HEADER */}
          <div className="ud-header-card">
            <p className="ud-greeting">Welcome back</p>
            <h1 className="ud-name">{user?.username || "Shopper"} 👋</h1>
            <p className="ud-email">{user?.useremail}</p>
            <span className="ud-badge">✦ Verified Member</span>
          </div>

          {/* QUICK LINKS */}
          <p className="ud-section-title">Quick Actions</p>
          <div className="row g-3">
            {quickLinks.map((item, i) => (
              <div className="col-6 col-md-4" key={i}>
                <div
                  className="ud-card"
                  style={{
                    "--card-color": item.color,
                    "--card-bg": item.bg
                  }}
                  onClick={item.action}
                >
                  <div className="ud-card-icon">{item.icon}</div>
                  <p className="ud-card-title">{item.title}</p>
                  <p className="ud-card-desc">{item.desc}</p>
                  <span className="ud-arrow">→</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default UserDashboard;