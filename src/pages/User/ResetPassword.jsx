import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./resetpassword.css";

function ResetPassword() {

    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {

            console.log("Token:", token);

            const response = await axios.post(
                `https://sandeep-ecom28db.duckdns.org/api/resetpassword/${token}`,
                {
                    password: password,
                    confirm_password: confirmPassword
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(response);

            setMessage(response.data.message);

        } catch (error) {

            console.log(error);

            if (error.response) {

                console.log(error.response.data);

                setMessage(error.response.data.message);

            } else {

                setMessage("Server not reachable.");

            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="container">

            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Reset Password"}
                </button>

            </form>

            {message && <p>{message}</p>}

        </div>
    );
}

export default ResetPassword;