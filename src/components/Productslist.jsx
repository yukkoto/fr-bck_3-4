import React from "react";
import ProductCard from "./ProductCard";

export default function ProductsList({ products, onEdit, onDelete }) {
  return (
    <div className="list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}