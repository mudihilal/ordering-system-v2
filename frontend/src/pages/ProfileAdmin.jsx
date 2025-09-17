import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../api/api";
import "../styles/ProfileAdmin.css";

export default function ProfileAdmin() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const data = await getOrders(user.token);
        setOrders(data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user || user.role !== "admin") {
    return <p>❌ Access denied. Admins only.</p>;
  }

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <h3>Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order, idx) => (
            <li key={order.id || idx} className="order-item">
              <p>
                <strong>Order ID:</strong> {order.id ?? "N/A"}
              </p>
              <p>
                <strong>User:</strong>{" "}
                {order.user?.email || "Unknown"}
              </p>
              <p>
                <strong>Total:</strong> ${order.total ?? 0}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {order.is_confirmed ? "✅ Confirmed" : "⏳ Pending"}
              </p>
              <p>
                <strong>Payment:</strong> {order.payment ?? "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
