"use client";
import Navbar from "@/app/_components/Navbar";
import Image from "next/image";
import { Icon } from "@iconify/react";
import CardPokemon from "@/app/_components/CardPokemon";

const pokemons = [
  {
    id: 1,
    name: "Pikachu",
    image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png",
    price: 100,
    price_mxn: 100,
    offert: 0.20,
    isPurchased: false,
    level: 1,
  },
  {
    id: 2,
    name: "Pikachu",
    image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png",
    price: 100,
    price_mxn: 100,
    offert: 0.20,
    isPurchased: true,
    level: 1,
  },
  {
    id: 3,
    name: "Pikachu",
    image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png",
    price: 100,
    price_mxn: 100,
    offert: 0.20,
    isPurchased: false,
    level: 1,
  },
  {
    id: 4,
    name: "Pikachu",
    image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png",
    price: 100,
    price_mxn: 100,
    offert: 0.20,
    isPurchased: false,
    level: 1,
  },
  {
    id: 15,
    name: "Pikachu",
    image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png",
    price: 100,
    price_mxn: 100,
    offert: 0.20,
    isPurchased: true,
    level: 1,
  },
];

export default function Catalog() {

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-200">
      <Navbar />


      <main className="container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">
            PokeStore
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pokemons.map((pokemon) => {
              return (
                <CardPokemon key={pokemon.id} pokemon={pokemon} />
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
