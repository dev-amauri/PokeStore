"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { usePokemonByID } from '@/app/_hooks/usePokemons';
import StatsOctagon from '@/app/_components/StatsOctagon';
import TypeBadge from '@/app/_components/TypeBadge';
import { PokemonDetail } from '@/app/_utils/types';
import Navbar from '@/app/_components/Navbar';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function PokemonDetailPage() {
  const { id } = useParams();
  const { data: pokemon, isLoading, error } = usePokemonByID(id as string);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading Pokémon...</p>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error loading the Pokémon</h1>
          <p className="mt-2">No pokemon found</p>
          <Link href="/my-pokemons" >
            <button className="bg-foreground text-background hover:bg-foreground/80 font-semibold py-3 px-6 rounded-lg transition-all duration-200 mt-4 cursor-pointer">
              Go to catalog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const pokemonData = pokemon as PokemonDetail;

  return (
    <div>
      <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center mt-27 md:mt-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row items-center justify-center gap-4">
          <div className="bg-border rounded-full shadow-lg py-2 px-4">
            <span className="text-2xl font-bold text-foreground">
              #{pokemonData.id.toString().padStart(3, '0')}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-foreground capitalize">
            {pokemonData.name}
          </h1>
          </div>

          <Link href="/catalog" >
            <button className="bg-border  p-2 rounded-full transition-all duration-200 mt-4 cursor-pointer">
              <Icon icon="icon-park-solid:back" className="w-6 h-6" />
            </button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* column left */}
            <div className="space-y-6">

              {/* image */}
              <div className="bg-border rounded-2xl p-8 shadow-xl">
                <div className="relative">
                  <img
                    src={pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                    className="w-full h-64 object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/10 dark:to-black-700/10 rounded-2xl pointer-events-none"></div>
                </div>
              </div>

              {/* types */}
              <div className="bg-border rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-center">
                  Types
                </h2>
                <div className="flex justify-center gap-3">
                  {pokemonData.types.map((type) => (
                    <TypeBadge key={type.slot} type={type.type.name} />
                  ))}
                </div>
              </div>

              {/* information */}
              <div className="bg-border rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-center">
                  Information
                </h2>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm">Height</p>
                    <p className="text-lg font-semibold">
                      {(pokemonData.height / 10).toFixed(1)} m
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">Weight</p>
                    <p className="text-lg font-semibold">
                      {(pokemonData.weight / 10).toFixed(1)} kg
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* column right */}
            <div className="space-y-6">
              {/* stats */}
              <div className="bg-border rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-6 text-center">
                  Stats Pokemon
                </h2>
                <StatsOctagon stats={pokemonData.stats} />
              </div>

              {/* stats detailed */}
              <div className="bg-border rounded-2xl p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4 text-center">
                  Stats detailed
                </h2>
                <div className="space-y-4">
                  {pokemonData.stats.map((stat) => {
                    const statNames: { [key: string]: string } = {
                      'hp': 'PS',
                      'attack': 'Attack',
                      'defense': 'Defense',
                      'speed': 'Speed',
                      'special-attack': 'Special Attack',
                      'special-defense': 'Special Defense'
                    };

                    return (
                      <div key={stat.stat.name} className="flex items-center justify-between">
                        <span className="font-medium">
                          {statNames[stat.stat.name] || stat.stat.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-card rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold min-w-[2rem] text-right">
                            {stat.base_stat}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
