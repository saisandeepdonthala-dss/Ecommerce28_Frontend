import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AdminResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage("All fields are required");
      setType("danger");
      return;
    }

    if (password.length < 6) {
      setMessage(
        "Password must be at least 6 characters"
      );
      setType("danger");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setType("danger");
      return;
    }

    try {
      const res = await axios.post(
        `https://sandeep-ecom28db.duckdns.org/api/admin/resetpassword/${token}`,
        
        {
         password: password,
    confirm_password: confirmPassword
        }
      );

      setMessage(
        res.data.message ||
          "Password reset successful"
      );
      setType("success");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to reset password"
      );
      setType("danger");
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
      }}
    >
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-5">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">

              <h2 className="text-center mb-4">
                Reset Password
              </h2>

              {message && (
                <div
                  className={`alert alert-${type}`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* New Password */}

                <div className="mb-3">
                  <label className="form-label">
                     password
                  </label>

                  <div className="input-group">
                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      className="form-control"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                    />

                    <span
                      className="input-group-text"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </span>
                  </div>
                </div>

                {/* Confirm Password */}

                <div className="mb-4">
                  <label className="form-label">
                    confirm_password
                  </label>

                  <div className="input-group">
                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      className="form-control"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                    />

                    <span
                      className="input-group-text"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Reset Password
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminResetPassword;