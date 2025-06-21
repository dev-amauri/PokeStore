import React from 'react';
import { Metadata } from 'next';
import PokemonDetailPage from './Detail';

export const metadata: Metadata = {
  title: "PokeStore | Detail",
  description: "Detail of the Pokémon",
};

export default function DetailPage() {
  return (
    <PokemonDetailPage />
  );
}
