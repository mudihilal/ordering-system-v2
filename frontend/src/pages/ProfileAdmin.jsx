
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext"; 

export default function ProfileAdmin() {
  const { user, logout } = useAuth();
  const { orders, confirmOrder } = useOrders();

  if (!user || user.role !== "admin") {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
      <h3 className="mb-2 font-semibold">Orders:</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order, idx) => (
            <li
              key={idx}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p><strong>{order.name}</strong> - {order.address}</p>
                <p>Total: ${order.total}</p>
              </div>
              <button
                onClick={() => confirmOrder(idx)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Confirm
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={logout}
        className="mt-6 bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}


