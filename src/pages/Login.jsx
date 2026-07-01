import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [role, setRole] = useState(
    location.state?.role || "user"
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function showBootstrapToast(message, type = "success") {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const url =
        role === "admin"
          ? "https://sandeep-ecom28db.duckdns.org/api/admin/login"
          : "https://sandeep-ecom28db.duckdns.org/api/user/login";

      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post(url, payload, {
        withCredentials: true,
      });

      showBootstrapToast(
        res.data.message || "Login Successful",
        "success"
      );

      if (role === "admin") {
        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.admin)
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        setTimeout(() => {
          navigate("/user-dashboard");
        }, 1500);
      }
    } catch (error) {
      showBootstrapToast(
        error.response?.data?.message ||
          "Login Failed",
        "danger"
      );
    }
  }
  return (
  <>
    {/* Bootstrap */}
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />

    {/* Toast */}
    {showToast && (
      <div
        className={`toast show align-items-center text-white bg-${toastType} border-0 custom-toast`}
        role="alert"
      >
        <div className="d-flex">
          <div className="toast-body">
            {toastMessage}
          </div>

          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
      </div>
    )}

    <div className="login-page">
      <div className="login-card">

        <h1 className="login-title">
          {role === "admin"
            ? "Admin Login"
            : "User Login"}
        </h1>

        <p className="login-subtitle">
          Welcome back! Please sign in to continue.
        </p>

        {/* Login Role */}

        <div className="mb-4">

          <label className="form-label d-block">
            Login As
          </label>

          <div className="form-check form-check-inline">

            <input
              className="form-check-input"
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={(e) => setRole(e.target.value)}
            />

            <label className="form-check-label">
              User
            </label>

          </div>

          <div className="form-check form-check-inline">

            <input
              className="form-check-input"
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => setRole(e.target.value)}
            />

            <label className="form-check-label">
              Admin
            </label>

          </div>

        </div>

        {/* Login Form */}

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="mb-3">

            <label className="form-label">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}

          <div className="mb-3">

            <label className="form-label">
              Password
            </label>

            <div className="input-group">

              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <span
                className="input-group-text bg-primary text-white"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </span>

            </div>

          </div>

          {/* Forgot Password */}

          <div className="text-end mb-4">

            <Link
              to="/forgot-password"
              state={{ role }}
              className="forgot-link"
            >
              Forgot Password?
            </Link>


          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>

        {/* Register */}

        <div className="register-link">

          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>
    </div>
  </>
);
}

export default Login;