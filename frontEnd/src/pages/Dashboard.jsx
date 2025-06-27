    // src/pages/Dashboard.jsx
    import React, { useEffect, useState } from "react";
    import axios from "axios";

    export default function Dashboard() {
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        axios
        .get("https://authentication-mern-peach.vercel.app/api/auth/dashboard", {
            headers: { "x-auth-token": token },
        })
        .then((res) => setMessage("Welcome to dashboard!"))
        .catch(() => setMessage("Unauthorized"));
    }, []);

    return <h2>{message}</h2>;
    }
