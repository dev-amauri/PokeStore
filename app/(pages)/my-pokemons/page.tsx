import React from 'react';
import { Metadata } from 'next';
import MyPokemons from './MyPokemons';

export const metadata: Metadata = {
  title: "PokeStore | My Pokémon",
  description: "Your Pokémon in the store",
};

export default function CatalogPage() {
  return (
    <MyPokemons />
  );
}
