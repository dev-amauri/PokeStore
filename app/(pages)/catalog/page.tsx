"use client";
import React, { useEffect, useState } from "react";

import CardPokemon from "@/app/_components/CardPokemon";
import Navbar from "@/app/_components/Navbar";
import FilterCatalog from "@/app/_components/FilterCatalog";
import SkeletonCard from "@/app/_components/SkeletonCard";

import { usePokemons } from "@/app/_hooks/usePokemons";
import { useCurrency } from "@/app/_hooks/useCurrency";
import { generatePokemonList } from "@/app/_utils/PokemonCurrencyList";
import { TypePokemon } from "@/app/_utils/types";
import { useCatalogStore } from "@/app/_stores/useCatalogStore";


export default function Catalog() {
  const { pokemonsCatalog, setPokemonsCatalog } = useCatalogStore();
  const [filteredPokemons, setFilteredPokemons] = useState<TypePokemon[]>([]);

  const { data: pokemons } = usePokemons();
  const { data: currencyCoins } = useCurrency();


  useEffect(() => {
    if (pokemons && currencyCoins) {
      const pokemonList = generatePokemonList(pokemons, currencyCoins);
      setPokemonsCatalog(pokemonList);
      setFilteredPokemons(pokemonList);
    }
  }, [pokemons, currencyCoins]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-200">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            PokeStore
          </h2>
          <FilterCatalog pokemonsList={pokemonsCatalog} onFilter={setFilteredPokemons} />

          {/* Card Pokemon */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPokemons.length > 0 ? filteredPokemons.map((pokemon: TypePokemon) => {
              return (
                <div key={pokemon.uuid}>
                  <CardPokemon pokemon={pokemon} />
                </div>
              )
            }) : (
              Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
