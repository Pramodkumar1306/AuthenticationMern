    import React, { useState } from "react";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";

    export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post("http://localhost:4000/api/auth/register", form);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        } catch (err) {
        alert(err.response?.data?.msg || "Register failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-5"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>

            <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
            name="email"
            placeholder="Email Address"
            type="email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
            Register
            </button>

            <p className="text-sm text-center text-gray-500">
            Already have an account? <a href="/login" className="text-purple-600 hover:underline">Log in</a>
            </p>
        </form>
        </div>
    );
    }
