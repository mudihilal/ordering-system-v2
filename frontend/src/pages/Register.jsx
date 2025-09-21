import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    full_name: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        const errorData = await res.json();
        alert(`Registration failed: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <input type="password" name="password2" value={formData.password2} onChange={handleChange} placeholder="Confirm Password" required />
      <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <button type="submit">Register</button>
    </form>
  );
}
