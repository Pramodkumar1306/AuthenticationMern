    // src/pages/Register.jsx
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
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
                <input name="name" placeholder="Name" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
    }
