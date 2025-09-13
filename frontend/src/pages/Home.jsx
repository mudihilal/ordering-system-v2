import React from "react";
import ProductGallery from "../components/ProductGallery";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-4">Welcome to My Shop</h1>
      <ProductGallery />
    </div>
  );
}

