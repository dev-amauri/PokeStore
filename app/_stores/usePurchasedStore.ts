import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TypePokemon } from "@/app/_utils/types";

interface PurchasedStore {
  purchasedPokemons: TypePokemon[];
  addMultiplePurchasedPokemons: (pokemons: TypePokemon[]) => void;
  isPokemonPurchased: (uuid: string) => boolean;
  removePokemonPurchased: (uuid: string) => void;
}

export const usePurchasedStore = create<PurchasedStore>()(
  persist(
    (set, get) => ({
      purchasedPokemons: [],
      // add multiple purchased pokemons
      addMultiplePurchasedPokemons: (pokemons: TypePokemon[]) => {
        set((state) => ({
          purchasedPokemons: [
            ...state.purchasedPokemons,
            ...pokemons.map(pokemon => ({ ...pokemon, isPurchased: true }))
          ]
        }));
      },

      // check if a pokemon is purchased
      isPokemonPurchased: (uuid: string) => {
        const { purchasedPokemons } = get();
        return purchasedPokemons.some(pokemon => pokemon.uuid === uuid);
      },

      //remove a pokemon from purchased pokemons
      removePokemonPurchased: (uuid: string) => {
        set((state) => ({
          purchasedPokemons: state.purchasedPokemons.filter(pokemon => pokemon.uuid !== uuid)
        }));
      },
    }),
    {
      name: "purchased-pokemons",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
