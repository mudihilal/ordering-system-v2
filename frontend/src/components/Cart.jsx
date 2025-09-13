
import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem"; 

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
