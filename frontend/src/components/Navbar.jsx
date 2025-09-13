
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home">MyShop</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/profile-user">User Profile</Link></li>
        <li><Link to="/profile-admin">Admin Profile</Link></li>
      </ul>
    </nav>
  );
}

