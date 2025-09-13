
import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card border p-4 rounded shadow text-center bg-white hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h2 className="text-lg font-bold mb-1">{product.name}</h2>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <p className="text-gray-800 font-semibold mb-3">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

