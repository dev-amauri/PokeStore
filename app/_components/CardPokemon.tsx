"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function CardPokemon({ key, pokemon }: { key: number, pokemon: Pokemon }) {

  const handleAddToCart = () => {
    console.log("Add to cart");
  }

  const handleReimbursing = () => {
    console.log("Reimbursing");
  }

  return (
    <div>


      <div key={pokemon.id} className="bg-card p-4 rounded-lg shadow-md">
        <div className="relative w-full h-50 rounded-lg bg-border flex items-center justify-center">
          <Image src={pokemon.image} alt={pokemon.name} fill className="object-contain z-1" />
          <p className="absolute text-[7rem] sm:text-[10rem] text-muted-foreground z-0">{pokemon.id <= 9 ? `00${pokemon.id}` : pokemon.id <= 99 ? `0${pokemon.id}` : pokemon.id}</p>
          <div className="absolute bottom-0 left-0 w-full h-10 bg-black/50 rounded-b-lg z-2">
            <p className="text-md font-bold text-white ">Nivel: {pokemon.level}</p>
          </div>
          {pokemon.isPurchased && (
            <div className="absolute top-[-25] left-[-20] bg-blue-400/70 rounded-lg z-2 p-2">
              <p className="text-md font-bold text-white ">In your pokedex</p>
            </div>
          )}
        </div>
        <h3 className="text-lg mt-2 text-left text-muted-foreground"># {pokemon.id <= 9 ? `00${pokemon.id}` : pokemon.id <= 99 ? `0${pokemon.id}` : pokemon.id}</h3>
        <h3 className="text-2xl font-bold mb-2 text-left">{pokemon.name}</h3>

        <p className="text-lg text-muted-foreground text-right mb-2">${pokemon.price}</p>

        {pokemon.isPurchased ? (
          // Reimbursing
          <div className="flex w-full items-center gap-2 justify-end">
            <div className="flex items-center gap-2 justify-end rounded-xl border-2 border-border pl-2">
              <p className="text-lg font-bold text-muted-foreground">${pokemon.price_mxn}</p>
              <button className={`flex items-center justify-center gap-2 bg-red-400/70 rounded-br-lg rounded-tr-lg p-2 cursor-pointer hover:bg-red-400/80 transition-all duration-200`} onClick={handleReimbursing}>
                <Icon icon="mynaui:pokeball-solid" className="w-6 h-6" />
                <p className="text-normal sm:text-md flex gap-2 break-words"> Reimbursing</p>
              </button>
            </div>
          </div>
        ) : (
          // Add to cart
          <div className="flex w-full items-center gap-2 justify-end">
            <div className="flex items-center gap-2 justify-end rounded-xl border-2 border-border pl-2">
              <p className="text-lg font-bold text-muted-foreground">${pokemon.price_mxn}</p>
              <button className={`flex items-center gap-2 bg-border rounded-br-lg rounded-tr-lg p-2 cursor-pointer hover:bg-border/50 transition-all duration-200`} onClick={handleAddToCart}>
                <Icon icon="fa6-solid:cart-plus" className="w-6 h-6" />
                <p className="text-normal sm:text-md flex gap-2"> Add to cart</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
