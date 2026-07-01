import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./register.css";


function Register() {
  
    const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  const [toastMessage, setToastMessage] = useState("");

  const [toastType, setToastType] = useState("success");

  const [role, setRole] = useState("user");

  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    useraddress: "",
    userpassword: "",
    userphone: "",
    usergender: "",
    useragree: false
  });
  const url =
    role === "admin"
      ? "https://sandeep-ecom28db.duckdns.org/api/admin/register"
      : "https://sandeep-ecom28db.duckdns.org/api/user/register";

  const payload =
    role === "admin"
      ? {
        username: formData.username,
        useremail: formData.useremail,
        useraddress: formData.useraddress,
        userpassword: formData.userpassword,
        useragree: formData.useragree
      }
      : {
        username: formData.username,
        useremail: formData.useremail,
        useraddress: formData.useraddress,
        userpassword: formData.userpassword,
        userphone: formData.userphone,
        usergender: formData.usergender
      };

  

  function handleChange(e) {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }

  // SHOW TOAST FUNCTION

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
        ? "https://sandeep-ecom28db.duckdns.org/api/admin/register"
        : "https://sandeep-ecom28db.duckdns.org/api/user/register";

    const payload =
      role === "admin"
        ? {
            username: formData.username,
            useremail: formData.useremail,
            useraddress: formData.useraddress,
            userpassword: formData.userpassword,
            useragree: formData.useragree
          }
        : {
            username: formData.username,
            useremail: formData.useremail,
            useraddress: formData.useraddress,
            userpassword: formData.userpassword,
            userphone: formData.userphone,
            usergender: formData.usergender
          };

    const res = await axios.post(url, payload);

    console.log(res.data);

    showBootstrapToast(
      res.data.message || "OTP Sent Successfully",
      "success"
    );

    navigate("/verify-otp", {
      state: {
        token: res.data.token,
        role: role
      }
    });

  } catch (error) {
    console.log(error.response?.data || error.message);

    showBootstrapToast(
      error.response?.data?.message || "Register Failed",
      "danger"
    );
  }
}
  return (
    <>
      {/* BOOTSTRAP 5 */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

     

      {/* TOAST */}

      {
        showToast && (
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
        )
      }

      <div className="register-page">

        <div className="register-card">

         
  <h1 className="register-title">
    Create Account
  </h1>

  {/* ROLE SELECTION */}

  <div className="mb-4">
    <label className="form-label d-block">
      Register As
    </label>

    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name="role"
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
        name="role"
        value="admin"
        checked={role === "admin"}
        onChange={(e) => setRole(e.target.value)}
      />

      <label className="form-check-label">
        Admin
      </label>
    </div>
  </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Username
              </label>

              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Email Address
              </label>

              <input
                type="email"
                className="form-control"
                name="useremail"
                placeholder="Enter email"
                value={formData.useremail}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Address
              </label>

              <input
                type="text"
                className="form-control"
                name="useraddress"
                placeholder="Enter address"
                value={formData.useraddress}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Password
              </label>

             <div className="input-group">
      <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        name="userpassword"
        placeholder="Enter password"
        value={formData.userpassword}
        onChange={handleChange}
        required
      />

      <span
        className="input-group-text bg-dark text-light"
        style={{ cursor: "pointer" }}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
            </div>

            {/* USER ONLY FIELDS */}

            {role === "user" && (
              <>
                <div className="mb-3">
                  <label className="form-label">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    name="userphone"
                    placeholder="Enter phone number"
                    value={formData.userphone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">
                    Gender
                  </label>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="usergender"
                      value="Male"
                      checked={formData.usergender === "Male"}
                      onChange={handleChange}
                    />

                    <label className="form-check-label">
                      Male
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="usergender"
                      value="Female"
                      checked={formData.usergender === "Female"}
                      onChange={handleChange}
                    />

                    <label className="form-check-label">
                      Female
                    </label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="usergender"
                      value="Other"
                      checked={formData.usergender === "Other"}
                      onChange={handleChange}
                    />

                    <label className="form-check-label">
                      Other
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* ADMIN ONLY FIELD */}

            {role === "admin" && (
              <div className="form-check mb-4">

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="useragree"
                  checked={formData.useragree}
                  onChange={handleChange}
                  required
                />

                <label className="form-check-label">
                  I agree to the Terms & Conditions
                </label>

              </div>
            )}

            <button
              type="submit"
              className="register-btn"
            >
              Register as {role === "admin" ? "Admin" : "User"}
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default Register;