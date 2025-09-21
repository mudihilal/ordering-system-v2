import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const { cart, clearCart } = useCart();
  const [payment, setPayment] = useState("Mpesa");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orders, setOrders] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please log in to view your profile.");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch profile");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (!userData) return;

    const fetchOrders = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/orders/${encodeURIComponent(userData.email)}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders", res.status, res.statusText);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [userData]);

  if (!userData) return <p>Loading profile...</p>;

  const totalCart = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Cart is empty.");

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Please log in to place an order.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
        const newOrder = await res.json();
        setOrders((prev) => [newOrder, ...prev]);
        clearCart();
        setOrderPlaced(true);
        alert("Order placed successfully!");
      } else {
        const errorData = await res.json();
        console.error("Failed to place order:", errorData);
        alert(`Failed to place order: ${JSON.stringify(errorData)}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Name:</strong> {userData.full_name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {userData.email || "N/A"}
      </p>
      <p>
        <strong>Phone:</strong> {userData.phone || "N/A"}
      </p>
      <p>
        <strong>Address:</strong> {userData.address || "N/A"}
      </p>

      {!orderPlaced ? (
        <form onSubmit={handlePlaceOrder}>
          <h3>Checkout</h3>
          <select value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value="Mpesa">Mpesa</option>
            <option value="TigoPesa">TigoPesa</option>
            <option value="Visa">Visa Card</option>
            <option value="Cash">Cash on Delivery</option>
          </select>

          <h4>Your Cart</h4>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul>
              {cart.map((item, idx) => (
                <li key={idx}>
                  {item.name} - ${item.price} × {item.quantity || 1}
                </li>
              ))}
            </ul>
          )}
          <p>Total: ${totalCart}</p>
          <button type="submit">Place Order</button>
        </form>
      ) : (
        <p>Order placed successfully!</p>
      )}

      <h3>Your Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order #{order.id} - Total: ${order.total} - Payment:{" "}
              {order.payment} - Status:{" "}
              {order.completed ? "Confirmed" : "Awaiting confirmation"}
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product_name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
