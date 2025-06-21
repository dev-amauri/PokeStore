import { create } from "zustand";
import { TypePokemon } from "@/app/_utils/types";

interface CatalogStore {
  pokemonsCatalog: TypePokemon[];
  setPokemonsCatalog: (pokemons: TypePokemon[]) => void;
  updatePokemonPurchasedStatus: (uuid: string, isPurchased: boolean) => void;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  pokemonsCatalog: [],
  setPokemonsCatalog: (pokemons: TypePokemon[]) => set({ pokemonsCatalog: pokemons }),
  // Update the status of a pokemon purchased
  updatePokemonPurchasedStatus: (uuid: string, isPurchased: boolean) =>
    set((state) => ({
      pokemonsCatalog: state.pokemonsCatalog.map(pokemon =>
        pokemon.uuid === uuid
          ? { ...pokemon, isPurchased }
          : pokemon
      )
    })),
}));
