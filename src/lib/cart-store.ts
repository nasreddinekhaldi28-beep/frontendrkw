"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (sku: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  subtotal: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.sku === newItem.sku);
          if (existing) {
            // Replace with new selection (user re-selected a quantity tier)
            return {
              items: state.items.map((i) =>
                i.sku === newItem.sku ? newItem : i
              ),
            };
          }
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (sku) =>
        set((state) => ({ items: state.items.filter((i) => i.sku !== sku) })),

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.lineTotal, 0),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "rahat-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
