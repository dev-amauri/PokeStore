"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

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
  const [visibleCount, setVisibleCount] = useState(8);
  const pokemonsPerPage = 8;

  const { data: pokemons } = usePokemons();
  const { data: currencyCoins } = useCurrency();


  useEffect(() => {
    if (pokemons && currencyCoins) {
      const pokemonList = generatePokemonList(pokemons, currencyCoins);
      setPokemonsCatalog(pokemonList);
      setFilteredPokemons(pokemonList);
      setVisibleCount(pokemonsPerPage);
    }
  }, [pokemons, currencyCoins]);

  useEffect(() => {
    setVisibleCount(pokemonsPerPage);
  }, [filteredPokemons.length]);

  const currentPokemons = filteredPokemons.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPokemons.length;

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-200 mt-20">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            PokeStore
          </h2>
          <FilterCatalog pokemonsList={pokemonsCatalog} onFilter={setFilteredPokemons} />

          {/* Card Pokemon */}
          <div>
            {currentPokemons.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {currentPokemons.map((pokemon: TypePokemon) => {
                    return (
                      <div key={pokemon.uuid}>
                        <CardPokemon pokemon={pokemon} />
                      </div>
                    )
                  })}
                </div>
                {/* Botón See More for Pagination*/}
                {hasMore && (
                  <button
                    className="mt-8 px-6 py-3 bg-foreground text-background rounded-lg font-bold shadow hover:bg-foreground/80 transition-all duration-200 cursor-pointer"
                    onClick={() => setVisibleCount((prev) => prev + pokemonsPerPage)}
                  >
                    See More
                  </button>
                )}
              </>
            ) : filteredPokemons.length === 0 ? (
              // No search results
              <div className="flex flex-col items-center justify-center py-12">
                <Icon icon="mdi:pokeball" className="text-[10rem] text-gray-500" />
                <p className="text-xl text-gray-500 text-center">No search results</p>
              </div>
            ) : (
              // Skeleton cards
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
