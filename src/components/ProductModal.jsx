import React, { useEffect, useState } from "react";

export default function ProductModal({ 
  open, 
  mode, 
  initialProduct, 
  onClose, 
  onSubmit 
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (!open) return;
    
    setName(initialProduct?.name ?? "");
    setCategory(initialProduct?.category ?? "");
    setDescription(initialProduct?.description ?? "");
    setPrice(initialProduct?.price != null ? String(initialProduct.price) : "");
    setStock(initialProduct?.stock != null ? String(initialProduct.stock) : "");
    setRating(initialProduct?.rating != null ? String(initialProduct.rating) : "");
  }, [open, initialProduct]);

  if (!open) return null;

  const title = mode === "edit" ? "Редактирование товара" : "Добавление товара";

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedCategory = category.trim();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);
    const parsedRating = rating ? Number(rating) : null;

    if (!trimmedName) {
      alert("Введите название товара");
      return;
    }

    if (!trimmedCategory) {
      alert("Введите категорию");
      return;
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      alert("Введите корректную цену (больше 0)");
      return;
    }

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      alert("Введите корректное количество на складе (целое число >= 0)");
      return;
    }

    if (rating && (!Number.isFinite(parsedRating) || parsedRating < 0 || parsedRating > 5)) {
      alert("Рейтинг должен быть от 0 до 5");
      return;
    }

    onSubmit({
      id: initialProduct?.id,
      name: trimmedName,
      category: trimmedCategory,
      description: description.trim(),
      price: parsedPrice,
      stock: parsedStock,
      rating: parsedRating
    });
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__title">{title}</div>
          <button className="iconBtn" onClick={onClose}>✕</button>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label className="label">
            Название *
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, Игровой ноутбук"
              autoFocus
              required
            />
          </label>

          <label className="label">
            Категория *
            <input
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Например, Ноутбуки"
              required
            />
          </label>

          <label className="label">
            Описание
            <textarea
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание товара..."
            />
          </label>

          <label className="label">
            Цена (₽) *
            <input
              className="input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Например, 129999"
              min="0.01"
              step="0.01"
              required
            />
          </label>

          <label className="label">
            Количество на складе *
            <input
              className="input"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Например, 10"
              min="0"
              step="1"
              required
            />
          </label>

          <label className="label">
            Рейтинг (0-5)
            <input
              className="input"
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Например, 4.5"
              min="0"
              max="5"
              step="0.1"
            />
          </label>

          <div className="modal__footer">
            <button type="button" className="btn" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn--primary">
              {mode === "edit" ? "Сохранить" : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}