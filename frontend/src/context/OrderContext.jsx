
import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]); 

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  const getUserOrders = (userEmail) => {
    return orders.filter((o) => o.user === userEmail);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
