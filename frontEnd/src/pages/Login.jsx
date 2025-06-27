    import React, { useState } from "react";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";

    export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post("https://authentication-mern-peach.vercel.app/api/auth/login", form);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        } catch (err) {
        alert(err.response?.data?.msg || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-5"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

            <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
            Login
            </button>

            <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <a href="/" className="text-purple-600 hover:underline">
                Register
            </a>
            </p>
        </form>
        </div>
    );
    }
