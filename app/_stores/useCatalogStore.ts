import { create } from "zustand";
import { TypePokemon } from "@/app/_utils/types";

interface CatalogStore {
  pokemonsCatalog: TypePokemon[];
  setPokemonsCatalog: (pokemons: TypePokemon[]) => void;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  pokemonsCatalog: [],
  setPokemonsCatalog: (pokemons: TypePokemon[]) => set({ pokemonsCatalog: pokemons }),
}));
