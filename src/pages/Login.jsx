import React, { useState } from "react";
import { Link } from "react-router-dom";
import { token, url } from "../constants/constants"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${url}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Add the Bearer token here
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Invalid credentials.");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("userdata", data.name);
            console.log(data)
            toast.success("Login Successful!");
            navigate("/dashboard");
            window.location.reload(); // Reload the page to reset auth state
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border rounded"
                />
                <button type="submit" className="w-full bg-black text-white py-2 rounded ">
                    Login
                </button>
                <p className="py-4">Don't have an account <Link to="/" className="text-blue-500">Register Here</Link></p>
            </form>
        </div>
    );
};

export default Login;
