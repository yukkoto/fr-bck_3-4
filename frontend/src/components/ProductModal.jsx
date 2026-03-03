import React, { useEffect, useState } from 'react';

const CATEGORIES = ['Аудио', 'Периферия', 'Мониторы', 'Видео', 'Накопители', 'Аксессуары', 'Другое'];

export default function ProductModal({ open, mode, initialProduct, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    if (!open) return;
    setName(initialProduct?.name ?? '');
    setCategory(initialProduct?.category ?? CATEGORIES[0]);
    setDescription(initialProduct?.description ?? '');
    setPrice(initialProduct?.price != null ? String(initialProduct.price) : '');
    setStock(initialProduct?.stock != null ? String(initialProduct.stock) : '');
    setRating(initialProduct?.rating != null ? String(initialProduct.rating) : '');
  }, [open, initialProduct]);

  if (!open) return null;

  const title = mode === 'edit' ? 'Редактирование товара' : 'Добавить товар';

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);
    const parsedRating = rating ? Number(rating) : null;

    if (!trimmedName) { alert('Введите название'); return; }
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) { alert('Введите корректную цену'); return; }
    if (!Number.isFinite(parsedStock) || parsedStock < 0) { alert('Введите корректное количество'); return; }
    if (parsedRating !== null && (parsedRating < 0 || parsedRating > 5)) { alert('Рейтинг от 0 до 5'); return; }

    onSubmit({
      id: initialProduct?.id,
      name: trimmedName,
      category,
      description: description.trim(),
      price: parsedPrice,
      stock: parsedStock,
      rating: parsedRating,
    });
  };

  return (
    <div className="backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal__header">
          <div className="modal__title">{title}</div>
          <button className="iconBtn" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <label className="label">
            Название *
            <input className="input" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Например, Наушники Sony" autoFocus />
          </label>
          <label className="label">
            Категория *
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="label">
            Описание
            <input className="input" value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Краткое описание товара" />
          </label>
          <label className="label">
            Цена (₽) *
            <input className="input" value={price} onChange={(e) => setPrice(e.target.value)}
              placeholder="Например, 9990" inputMode="numeric" />
          </label>
          <label className="label">
            Количество на складе *
            <input className="input" value={stock} onChange={(e) => setStock(e.target.value)}
              placeholder="Например, 10" inputMode="numeric" />
          </label>
          <label className="label">
            Рейтинг (0–5)
            <input className="input" value={rating} onChange={(e) => setRating(e.target.value)}
              placeholder="Например, 4.8" inputMode="decimal" />
          </label>
          <div className="modal__footer">
            <button type="button" className="btn" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn btn--primary">
              {mode === 'edit' ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
