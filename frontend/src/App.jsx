
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProfileUser from "./pages/ProfileUser";
import ProfileAdmin from "./pages/ProfileAdmin";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";

export default function App() {
  return (
    <OrderProvider>
    <AuthProvider>
    <CartProvider>
      <Navbar />

      <div className="container mx-auto p-4">
        <Routes>
    
          <Route path="/" element={<Navigate to="/home" replace />} />

        
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} /> 
          <Route path="/profile-user" element={<ProfileUser />} />
          <Route path="/profile-admin" element={<ProfileAdmin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          

      
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </CartProvider>
    </AuthProvider>
    </OrderProvider>
  );
}





