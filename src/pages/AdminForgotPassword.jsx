import React, { useState } from "react";
import axios from "axios";

function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://sandeep-ecom28db.duckdns.org/api/admin/forgotpassword",
        
        { email }
      );

      setMessage(res.data.message);
      setType("success");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );
      setType("danger");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "450px" }}
      >
        <h2 className="text-center mb-4">
          Forgot Password
        </h2>

        {message && (
          <div className={`alert alert-${type}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email Address</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminForgotPassword;