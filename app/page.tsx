import React from 'react';
import { Metadata } from 'next';
import Home from './Home';

export const metadata: Metadata = {
  title: "PokeStore",
  description: "Your favorite Pokémon store",
};

export default function Login() {
  return (
      <Home />
  );
}
