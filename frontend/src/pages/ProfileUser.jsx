import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function ProfileUser() {
  const { user, logout } = useAuth();
  const { cart, clearCart } = useCart();
  const [payment, setPayment] = useState("Mpesa");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [userData, setUserData] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  // Fetch user profile from backend
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/profile/", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          // fallback to local storage (mock)
          setUserData(JSON.parse(localStorage.getItem("registeredUser")));
        }
      } catch {
        setUserData(JSON.parse(localStorage.getItem("registeredUser")));
      }
    };
    fetchProfile();
  }, [user]);

  if (!user) return <p>Please login to view your profile.</p>;

  // Place order → send to backend
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Cart is empty.");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            product: item.id,
            quantity: item.quantity || 1,
          })),
          payment,
        }),
      });

      if (res.ok) {
        setOrderPlaced(true);
        clearCart();
        alert("Order placed successfully!");
      } else {
        alert("Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">User Profile</h2>

      {/* Profile Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <p><strong>Name:</strong> {userData?.full_name}</p>
        <p><strong>Email:</strong> {userData?.email}</p>
        <p><strong>Phone:</strong> {userData?.phone}</p>
        <p><strong>Address:</strong> {userData?.address}</p>
      </div>

      {/* Checkout Section */}
      {!orderPlaced ? (
        <form onSubmit={handlePlaceOrder}>
          <select
            className="border rounded p-2 mb-4"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value="Mpesa">Mpesa</option>
            <option value="TigoPesa">TigoPesa</option>
            <option value="Visa">Visa Card</option>
            <option value="Cash">Cash on Delivery</option>
          </select>

          <h3 className="font-semibold mt-4">Your Cart</h3>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul className="list-disc pl-6">
              {cart.map((item, idx) => (
                <li key={idx}>
                  {item.name} - ${item.price} × {item.quantity || 1}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 font-bold">Total: ${total}</p>

          <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Place Order
          </button>
        </form>
      ) : (
        <p className="text-green-600 font-semibold">Order placed successfully!</p>
      )}

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
