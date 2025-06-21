"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

import CardPokemon from "@/app/_components/CardPokemon";
import Navbar from "@/app/_components/Navbar";
import FilterCatalog from "@/app/_components/FilterCatalog";
import SkeletonCard from "@/app/_components/SkeletonCard";

import { usePurchasedStore } from "@/app/_stores/usePurchasedStore";
import { TypePokemon } from "@/app/_utils/types";

export default function MyPokemons() {
  const { purchasedPokemons } = usePurchasedStore();
  const [filteredPokemons, setFilteredPokemons] = useState<TypePokemon[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const pokemonsPerPage = 8;

  useEffect(() => {
    setFilteredPokemons(purchasedPokemons);
    setVisibleCount(pokemonsPerPage);
  }, [purchasedPokemons]);

  // Reset visibleCount when filteredPokemons changes due to filtering
  useEffect(() => {
    setVisibleCount(pokemonsPerPage);
  }, [filteredPokemons]);

  const currentPokemons = filteredPokemons.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPokemons.length;

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-200 mt-20">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            My Pokémons
          </h2>
          <FilterCatalog pokemonsList={purchasedPokemons} onFilter={setFilteredPokemons} />
          {/* No purchased pokemons */}
          {purchasedPokemons.length === 0 ? (
            <div className="flex flex-col gap-4 items-center justify-center py-12">
              <div className="relative flex items-center justify-center">
                <Icon icon="mdi:pokeball" className="text-[10rem] text-gray-500" />
              </div>
              <p className="text-xl text-gray-500 text-center">You haven't purchased any Pokémon yet</p>
              <Link href="/catalog">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-600 transition-all duration-200 cursor-pointer">
                  Browse Catalog
                </button>
              </Link>
            </div>
          ) : (
            <>
              <p className="text-lg text-gray-500 mb-8">
                You have {purchasedPokemons.length} Pokémon in your collection
              </p>

              {/* Grid pokemons purchased */}
              <div>
                {currentPokemons.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {currentPokemons.map((pokemon) => (
                        <div key={pokemon.uuid}>
                          <CardPokemon pokemon={pokemon} />
                        </div>
                      ))}
                    </div>
                    {/* Load more */}
                    {hasMore && (
                      <button className="mt-8 px-6 py-3 bg-foreground text-background rounded-lg font-bold shadow hover:bg-foreground/80 transition-all duration-200 cursor-pointer" onClick={() => setVisibleCount(visibleCount + pokemonsPerPage)}>
                        Load More
                      </button>
                    )}
                  </>
                ) : filteredPokemons.length === 0 && purchasedPokemons.length > 0 ? (
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
            </>
          )}
        </div>
      </main>
    </div>
  );
}