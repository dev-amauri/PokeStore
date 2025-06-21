'use client';
import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './_theme/ThemeToggle';
import { Icon } from '@iconify/react';
import { useSound } from 'use-sound';

export default function Home() {
  const [play] = useSound('/sounds/pikachu.mp3', { volume: 0.5 });
  return (
    <div className="flex items-center justify-center h-full w-full min-h-screen">
      <div className="text-center">
        <div className="flex md:flex-row flex-col items-center justify-center gap-4">
          <Icon icon="hugeicons:pokeball" className="w-20 h-20 hidden md:block" />
          <h1 className="text-6xl font-bold mb-4">
          PokeStore
          </h1>
          <Icon icon="hugeicons:pokeball" className="w-20 h-20 block md:hidden" />

        </div>
        <p className="mt-4 text-gray-600 text-lg mb-8">Your favorite Pokémon store</p>
        <Link
          href="/catalog"
          className="inline-block bg-foreground text-background hover:bg-foreground/80 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          onClick={() => play()}
        >
          Go to Catalog
        </Link>
      </div>
      <div className="absolute top-10 right-10 p-4">
        <ThemeToggle isMobile={false} />
      </div>

    </div>
  );
}