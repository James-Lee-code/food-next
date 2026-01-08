'use client';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({
  items: [],
  isCartOpen: false,
  addItem: () => {},
  removeItem: () => {},
  openCart: () => {},
  closeCart: () => {},
});

export function CartContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (err) {
        console.error('Failed to parse cart from localStorage:', err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  function addItem(item) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeItem(id) {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  const ctx = {
    items,
    addItem,
    removeItem,
    isCartOpen,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={ctx}>
      {children}
    </CartContext.Provider>
  );
}
