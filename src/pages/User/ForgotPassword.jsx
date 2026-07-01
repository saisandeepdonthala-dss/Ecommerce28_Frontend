import { useState } from "react";
import axios from "axios";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                "https://sandeep-ecom28db.duckdns.org/api/forgotpassword",
                {
                    email,
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

            <h2>Forgot Password</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit">
                    Send Reset Link
                </button>

            </form>

            {message && <p>{message}</p>}

        </div>
    );
}

export default ForgotPassword;