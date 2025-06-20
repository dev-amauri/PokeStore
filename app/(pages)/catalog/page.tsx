"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import CardPokemon from "@/app/_components/CardPokemon";
import Navbar from "@/app/_components/Navbar";

import { usePokemons } from "@/app/_hooks/usePokemons";
import { useCurrency } from "@/app/_hooks/useCurrency";
import { generatePokemonList } from "@/app/_utils/PokemonCurrencyList";
import { useForm } from "react-hook-form";

// Types
type FormData = {
  search: string;
  currency: string;
}

type Pokemon = {
  uuid: string;
  numberPokemon: number;
  name: string;
  imagePokemon: string;
  priceRandom: string;
  priceUSD: string;
  offert: string;
  offertUSD: string;
  currencyKey: string;
  isPurchased: boolean;
}

export default function Catalog() {
  const [filterPokemonList, setFilterPokemonList] = useState<Pokemon[]>([]);

  const { data: pokemons } = usePokemons();
  const { data: currencyCoins } = useCurrency();
  const { register, handleSubmit, watch} = useForm<FormData>({
    defaultValues: {
      search: "",
      currency: "all"
    }
  });

  useEffect(() => {
    if (pokemons && currencyCoins) {
      const pokemonList = generatePokemonList(pokemons, currencyCoins);
      setFilterPokemonList(pokemonList);
    }
  }, [pokemons, currencyCoins]);
  
  useEffect(() => {
    if (pokemons && currencyCoins) {
      const subscription = watch((values) => {
        onSubmit(values as FormData);
      });
      return () => subscription.unsubscribe();
    }
  }, [pokemons, currencyCoins]);
  
  if (!pokemons || !currencyCoins) return null;
  const pokemonList = generatePokemonList(pokemons, currencyCoins);

  const onSubmit = (data: FormData) => {
    console.log(data);
    const filteredPokemons = pokemonList.filter((pokemon: Pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(data.search.toLowerCase());
      const matchesCurrency = data.currency === "all" || pokemon.currencyKey === data.currency;
      return matchesName && matchesCurrency;
    });
    setFilterPokemonList(filteredPokemons);
  };



  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-200">
      <Navbar />


      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            PokeStore
          </h2>
          {/* Filters Pokemon */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center gap-2 w-full mb-8 flex-col md:flex-row">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Name Pokemon</label>
              <input type="text" placeholder="Search Pokemon" className="w-full p-2 rounded-md border border-gray-300" {...register("search")} />
            </div>
            <div className="w-full md:max-w-sm">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Currency</label>
              <select className="w-full p-2 rounded-md border border-gray-300" {...register("currency")}>
                <option value="all" className="bg-background text-foreground">All</option>
                <option value="USD" className="bg-background text-foreground">USD ($)</option>
                <option value="EUR" className="bg-background text-foreground">EUR (€)</option>
                <option value="JPY" className="bg-background text-foreground">JPY (¥)</option>
                <option value="MXN" className="bg-background text-foreground">MXN ($)</option>
                <option value="CAD" className="bg-background text-foreground">CAD ($)</option>
              </select>
            </div>
          </form>

          {/* Card Pokemon */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filterPokemonList.map((pokemon: Pokemon) => {
              return (
                <CardPokemon key={pokemon.uuid} pokemon={pokemon} />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
