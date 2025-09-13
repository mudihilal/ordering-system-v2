
import React from "react";
import laptopImg from "../assets/laptop.jpg";
import phoneImg from "../assets/phone.jpg";
import headphoneImg from "../assets/headphone.jpg";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Laptop",
    model: "Dell Inspiron",
    price: 4800000, 
    image: laptopImg,
    description: "High-performance Dell laptop for work and gaming.",
  },
  {
    id: 2,
    name: "Phone",
    model: "iPhone 14",
    price: 2500000, 
    image: phoneImg,
    description: "Latest iPhone with long battery life.",
  },
  {
    id: 3,
    name: "Headphone",
    model: "Sony WH-1000XM4",
    price: 620000, 
    image: headphoneImg,
    description: "Noise-cancelling Sony headphones with deep bass.",
  },
];

export default function ProductGallery() {
  return (
    <div
      className="product-gallery grid gap-6 mt-20 px-6"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

