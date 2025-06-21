import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TypePokemon } from "../_utils/types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CartState {
  cart: TypePokemon[];
  addToCart: (pokemon: TypePokemon) => void;
  removeFromCart: (uuid: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
      (set) => ({
        cart: [],
        // add to cart
        addToCart: (pokemon: TypePokemon) => set((state) => ({ cart: [...state.cart, pokemon] })),
        // remove from cart
        removeFromCart: (uuid: string) => set((state) => ({ cart: state.cart.filter((p) => p.uuid !== uuid) })),
        // clear cart
        clearCart: () => set({ cart: [] }),
      }),
      {
        name: "cart",
        storage: createJSONStorage(() => localStorage),
      }
    )
);