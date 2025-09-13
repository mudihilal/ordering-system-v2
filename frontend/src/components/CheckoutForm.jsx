
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();

  const [payment, setPayment] = useState("Mpesa");
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!user) return <p>Please login to continue to checkout.</p>;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("No items in cart!");
      return;
    }

    const newOrder = {
      user: user.email,
      name: user.name,
      address: user.address,
      phone: user.phone,
      payment,
      items: cart,
      total,
      date: new Date().toLocaleString(),
    };

    addOrder(newOrder);
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Checkout</h2>

      {!orderPlaced ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-3 rounded">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>

          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="Mpesa">Mpesa</option>
            <option value="TigoPesa">TigoPesa</option>
            <option value="Visa">Visa Card</option>
            <option value="Cash">Cash on Delivery</option>
          </select>

          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">Your Cart</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">No items in cart.</p>
            ) : (
              <ul className="space-y-2">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 font-bold text-lg">Total: ${total}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          >
            Pay & Place Order
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-bold text-green-600">
            Order Placed Successfully 🎉
          </h3>
          <p className="mt-3">
            Thank you <span className="font-semibold">{user.name}</span>!
          </p>
          <p>
            Your order will be delivered to:{" "}
            <span className="font-semibold">{user.address}</span>
          </p>
          <p className="mt-2">
            Payment Method: <span className="font-semibold">{payment}</span>
          </p>
        </div>
      )}
    </div>
  );
}



