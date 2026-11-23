"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  id: string;
  product: string;
  sizeLabel: string;
  price: number;
  qty: number;
};

type AddItem = Omit<CartItem, "qty"> & { qty?: number };

type CartContextValue = {
  items: CartItem[];
  addItem: (item: AddItem) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "pawclock-cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage failures
    }
  }, [items]);

  const addItem = (item: AddItem) => {
    const id = item.id;
    const qty = item.qty ?? 1;
    const existing = items.find((i) => i.id === id);
    if (existing) {
      setItems(
        items.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
      );
      return;
    }
    setItems([...items, { ...item, qty }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setItems(items.filter((i) => i.id !== id));
      return;
    }
    setItems(items.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.price * i.qty, 0);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    setQty,
    clearCart,
    count,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
