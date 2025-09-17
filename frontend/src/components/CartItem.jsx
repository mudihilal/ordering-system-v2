
import React from "react";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">
          ${item.price} x {item.quantity || 1}
        </p>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
}
