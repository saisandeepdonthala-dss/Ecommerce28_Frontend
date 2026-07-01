import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
    const { token } = useParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `https://sandeep-ecom28db.duckdns.org/api/resetpassword/${token}`,
                {
                    password,
                    confirm_password: confirmPassword,
                }
            );

            setMessage(response.data.message);

        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Server not reachable.");
            }
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

                <button type="submit">
                    Reset Password
                </button>

            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPassword;