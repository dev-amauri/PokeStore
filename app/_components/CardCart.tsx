"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { TypePokemon } from "@/app/_utils/types";
import { FormatPrice } from "@/app/_utils/formatNumber";
import { useCartStore } from "@/app/_stores/useCartStore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CardCart({ pokemon }: { pokemon: TypePokemon }) {
  const { cart, removeFromCart, clearCart } = useCartStore();

  // function for reimbursing pokemones
  const handleRemovePokemon = () => {
    removeFromCart(pokemon.uuid);
  }

  return (
    <div className="bg-card p-2 rounded-lg shadow-md flex flex-col sm:flex-row gap-2 w-full justify-between md:-w-[400px] transition-all duration-200">

      <div className="flex items-start justify-start gap-2 sm:flex-row flex-col">
        <div className="relative w-full sm:w-35 h-34 rounded-lg bg-border flex items-center justify-center">
          <Image src={pokemon.imagePokemon} alt={pokemon.name} fill className="object-contain z-1 scale-[0.8]" loading="lazy" />
          <p className="absolute text-[3rem] sm:text-[5rem] text-muted-foreground z-0">{pokemon.numberPokemon <= 9 ? `00${pokemon.numberPokemon}` : pokemon.numberPokemon <= 99 ? `0${pokemon.numberPokemon}` : pokemon.numberPokemon}</p>
          <div className="absolute bottom-0 left-0 w-full h-10 bg-black/50 rounded-b-lg z-2 flex items-center justify-center">
            <p className="text-sm font-bold text-white text-center ">Level: 1 | PS: 100</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm mt-2 text-left text-muted-foreground"># {pokemon.numberPokemon <= 9 ? `00${pokemon.numberPokemon}` : pokemon.numberPokemon <= 99 ? `0${pokemon.numberPokemon}` : pokemon.numberPokemon}</h3>
          <h3 className="text-lg font-bold mb-2 text-left">{pokemon.name}</h3>
        </div>
      </div>


      <div>
        <div className="flex flex-col gap-2 justify-end items-end h-full w-full">
          <p className="text-md text-muted-foreground text-right mb-2">{FormatPrice(pokemon.priceRandom, pokemon.currencyKey)}</p>
          <div className="flex w-full sm:w-[max-content] items-center gap-2 justify-end">
            <div className="flex items-center gap-2 justify-end rounded-xl border-2 border-border pl-2 w-full">
              <p className="text-sm font-bold text-muted-foreground w-full">{FormatPrice(pokemon.price, "USD")}</p>
              <button className={`w-[55%] sm:w-auto flex items-center justify-center gap-2 bg-red-400/70 rounded-br-lg rounded-tr-lg p-2 cursor-pointer hover:bg-red-500/80 transition-all duration-200`} onClick={handleRemovePokemon}>
                <p className="text-normal flex gap-2 break-words"> Remove</p>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
