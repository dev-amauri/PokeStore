"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TypePokemon } from "@/app/_utils/types";

// Types
type FormData = {
  search: string;
  currency: string;
};

export default function FilterCatalog({ pokemonsList, onFilter }: { pokemonsList: TypePokemon[]; onFilter: (filtered: TypePokemon[]) => void; }) {

  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      search: "",
      currency: "all"
    }
  });

  useEffect(() => {
    onFilter(pokemonsList);
  }, [pokemonsList]);

  // Watch the form and filter the pokemons list
  useEffect(() => {
    const subscription = watch((values) => {
      onSubmit(values as FormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, pokemonsList, onFilter]);

  // filter the pokemons list
  const onSubmit = (data: FormData) => {
    const filtered = pokemonsList.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(data.search.toLowerCase());
      const matchesCurrency = data.currency === "all" || pokemon.currencyKey === data.currency;
      return matchesName && matchesCurrency;
    });
    onFilter(filtered);
  };

  return (
    <>
      {/* Filters Pokemon */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center gap-2 w-full mb-8 flex-col md:flex-row">
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-foreground  text-left">Name Pokemon</label>
          <input type="text" placeholder="Search Pokemon" className="w-full p-2 rounded-md border border-gray-300 bg-background text-foreground" {...register("search")} />
        </div>
        <div className="w-full md:max-w-sm">
          <label className="block mb-2 text-sm font-medium text-foreground text-left">Currency</label>
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
    </>
  );
}
