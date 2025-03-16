"use client";

import { Item } from "@/features/cart/types";
import { create } from "zustand";

type CartStore = {
  items: Item[];
  addItem: (item: Item) => void;
  clearCart: () => void;
  totalPrice: () => number;
  setItems: (items: Item[]) => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return { items: [...state.items, item] };
      }
    });
  },
  clearCart: () => set({ items: [] }),
  totalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
  setItems: (items) => set({ items }),
}));
