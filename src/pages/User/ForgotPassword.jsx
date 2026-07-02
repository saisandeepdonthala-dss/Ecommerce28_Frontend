import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!email) {
            setMessage("Please enter your email.");
            return;
        }

        setLoading(true);

        try {

            const response = await axios.post(
                "https://sandeep-ecom28db.duckdns.org/api/forgotpassword",
                {
                    email: email
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("SUCCESS");
            console.log(response);

            setMessage(response.data.message);

        } catch (error) {

            console.log("ERROR");

            if (error.response) {

                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);

                setMessage(error.response.data.message);

            } else if (error.request) {

                console.log("No response received");
                console.log(error.request);

                setMessage("Server not responding.");

            } else {

                console.log(error.message);

                setMessage(error.message);
            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="container">

            <h2>Forgot Password</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link"}
                </button>

            </form>

            {message && (
                <p style={{ marginTop: "20px" }}>
                    {message}
                </p>
            )}

        </div>
    );
}

export default ForgotPassword;