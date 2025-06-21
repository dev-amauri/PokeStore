import React from 'react';
import { Metadata } from 'next';
import Catalog from './Catalog';

export const metadata: Metadata = {
  title: "PokeStore | Catalog",
  description: "All Pokémon in the store",
};

export default function CatalogPage() {
  return (
    <Catalog />
  );
}
