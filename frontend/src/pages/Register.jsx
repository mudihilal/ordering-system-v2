import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Function to get CSRF token from cookie
  function getCSRFToken() {
    const match = document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'));
    if (match) return match[2];
    return "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(), // Add CSRF token header
        },
        credentials: "include", // Ensure cookies are sent
        body: JSON.stringify({ name, email, phone, address, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "❌ Registration failed.");
        return;
      }

      alert("✅ Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError("❌ Server error. Please check backend.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="register-error">{error}</p>}

        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
