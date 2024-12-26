import React, { useState } from "react";
import { Link } from "react-router-dom";
import { token, url } from "../constants/constants"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`${url}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Add the Bearer token here
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to register.");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            toast.success("Registration Successful!");
            navigate("/login")
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mb-4 border rounded"
                />
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
                    Register
                </button>
                <p className="py-4">already have an account <Link to="/login" className="text-blue-500">login</Link></p>
            </form>
        </div>
    );
};

export default Register;
