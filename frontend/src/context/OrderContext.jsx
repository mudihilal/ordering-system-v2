import React, { createContext, useContext, useState, useEffect } from "react";
import { getOrders, createOrder, confirmOrder } from "../api/api";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.token) {
      setOrders([]); 
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrders(user.token);
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleCreateOrder = async (orderData) => {
    if (!user || !user.token) {
      alert("⚠️ You must be logged in to place an order.");
      return null;
    }
    try {
      const newOrder = await createOrder(user.token, orderData);
      setOrders((prev) => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      console.error("❌ Failed to create order:", err);
      return null;
    }
  };

  const handleConfirmOrder = async (orderId) => {
    if (!user || user.role !== "admin") {
      alert("⚠️ Only admins can confirm orders.");
      return;
    }
    try {
      const updatedOrder = await confirmOrder(user.token, orderId);
      setOrders((prev) =>
        prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
      );
    } catch (err) {
      console.error("❌ Failed to confirm order:", err);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        createOrder: handleCreateOrder,
        confirmOrder: handleConfirmOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
