
import React from "react";
import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-gray-600 text-sm">${item.price}</p>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
}
