import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./verifyotp.css";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const tokenFromRegister = location.state?.token || "";
const role = location.state?.role || "user";
  const [otpData, setOtpData] = useState({
    otp: "",
    token: tokenFromRegister,
  });

  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  function handleChange(e) {
    setOtpData({
      ...otpData,
      [e.target.name]: e.target.value,
    });
  }
if (!tokenFromRegister) {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger">
        Invalid access. Please register first.
      </div>
    </div>
  );
}
 async function handleSubmit(e) {
  e.preventDefault();

  try {
    const url =
      role === "admin"
        ? "https://sandeep-ecom28db.duckdns.org/api/admin/verify-otp"
        : "https://sandeep-ecom28db.duckdns.org/api/user/verify-otp";

    const payload = {
      otp: otpData.otp,
      token: otpData.token
    };

    const res = await axios.post(
      url,
      payload,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log(res.data);

    setMessage(
      res.data.message || "Verification Successful"
    );

    setAlertType("success");

    setTimeout(() => {
      navigate("/login", {
        state: { role }
      });
    }, 1500);

  } catch (error) {

    console.log(
      error.response?.data || error.message
    );

    setMessage(
      error.response?.data?.message ||
      "Invalid OTP"
    );

    setAlertType("danger");
  }
}

  return (
    <>
      {/* Bootstrap 5.0.2 */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

   

      <div className="otp-page">

        <div className="otp-card">
<h1 className="otp-title">
  Verify OTP
</h1>

<p className="text-center text-muted">
  {role === "admin"
    ? "Admin Verification"
    : "User Verification"}
</p>

          {message && (
            <div className={`alert alert-${alertType}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-4">

              <label className="form-label">
                Enter OTP
              </label>

              <input
                type="text"
                name="otp"
                className="form-control"
                placeholder="Enter OTP"
                value={otpData.otp}
                onChange={handleChange}
                required
              />

            </div>

            <button
              type="submit"
              className="verify-btn"
            >
              Verify OTP
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default VerifyOtp;