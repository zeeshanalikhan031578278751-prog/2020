"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { CartItem } from "./types";

const STORAGE_KEY = "ecommerce-cart-v1";

interface CartContextValue {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({
  children
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const stored =
        typeof window !== "undefined"
          ? window.localStorage.getItem(STORAGE_KEY)
          : null;
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
    }
  }, []);

  // Persist cart in localStorage on change
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(items)
        );
      }
    } catch (error) {
      console.error("Failed to save cart to storage:", error);
    }
  }, [items]);

  const addItem = (productId: string, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === productId
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + quantity
              }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  const updateItemQuantity = (
    productId: string,
    quantity: number
  ) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.productId !== productId);
      }
      const exists = prev.some(
        (item) => item.productId === productId
      );
      if (!exists) {
        return [...prev, { productId, quantity }];
      }
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  const getItemQuantity = (productId: string) => {
    const item = items.find(
      (i) => i.productId === productId
    );
    return item ? item.quantity : 0;
  };

  const value: CartContextValue = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateItemQuantity,
      clearCart,
      getItemCount,
      getItemQuantity
    }),
    [items]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
