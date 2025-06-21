'use client';

import { useQuery } from "@tanstack/react-query";
import api from "../_utils/api";

export const usePokemons = () =>  {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: api.apiPokemon.getAllPokemons,
    select: (data) => data.results,
  });
}

export const usePokemonByID = (id: string) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => api.apiPokemon.getByIDPokemons(id),
  });
}

