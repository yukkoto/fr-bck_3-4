import React from "react";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="productCard">
      <div className="productCard__header">
        <h3 className="productCard__name">{product.name}</h3>
        <span className="productCard__category">{product.category}</span>
      </div>
      
      <p className="productCard__description">{product.description}</p>
      
      <div className="productCard__details">
        <span className="productCard__price">{product.price.toLocaleString()} ₽</span>
        <span className="productCard__stock">В наличии: {product.stock}</span>
        {product.rating && (
          <span className="productCard__rating">⭐ {product.rating}</span>
        )}
      </div>
      
      <div className="productCard__actions">
        <button className="btn" onClick={() => onEdit(product)}>
          ✏️ Редактировать
        </button>
        <button className="btn btn--danger" onClick={() => onDelete(product.id)}>
          🗑️ Удалить
        </button>
      </div>
    </div>
  );
}