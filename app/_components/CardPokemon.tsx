"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { TypePokemon } from "@/app/_utils/types";
import { FormatPrice } from "@/app/_utils/formatNumber";
import { useCartStore } from "@/app/_stores/useCartStore";
import { useCatalogStore } from "@/app/_stores/useCatalogStore";
import { usePurchasedStore } from "@/app/_stores/usePurchasedStore";
import { useWalletStore } from "@/app/_stores/useWalletStore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

export default function CardPokemon({ pokemon }: { pokemon: TypePokemon }) {
  const { addToCart, cart } = useCartStore();
  const { pokemonsCatalog, updatePokemonPurchasedStatus } = useCatalogStore();
  const { isPokemonPurchased, removePokemonPurchased } = usePurchasedStore();
  const { addFunds } = useWalletStore();
  const [isPurchased, setIsPurchased] = useState(false);


  useEffect(() => {
    setIsPurchased(isPokemonPurchased(pokemon.uuid));
  }, [isPokemonPurchased, pokemon.uuid, pokemonsCatalog]);

  // fuction for add to cart
  const handleAddToCart = (uuid: string) => {
    const exists = cart.some((p) => p.uuid === uuid);
    if (exists) {
      toast.warn("This Pokémon is already in the cart!");
      return;
    }
    addToCart(pokemon);
    toast.success("Pokémon added to cart!");
  }

  // function for reimbursing pokemones
  const handleReimbursing = (uuid: string) => {
    removePokemonPurchased(uuid);
    updatePokemonPurchasedStatus(uuid, false);
    addFunds(pokemon.price);
    toast.info("Pokémon reimbursed!");
  }

  return (
    <div>
      <div className="bg-card p-4 rounded-lg shadow-md">
        <div className="relative w-full h-50 rounded-lg bg-border flex items-center justify-center">
          <Image src={pokemon.imagePokemon} alt={pokemon.name} fill className="object-contain z-1" loading="lazy"/>
          <p className="absolute text-[7rem] sm:text-[10rem] text-muted-foreground z-0">{pokemon.numberPokemon <= 9 ? `00${pokemon.numberPokemon}` : pokemon.numberPokemon <= 99 ? `0${pokemon.numberPokemon}` : pokemon.numberPokemon}</p>
          <div className="absolute bottom-0 left-0 w-full h-10 bg-black/50 rounded-b-lg z-2 flex items-center justify-center">
            <p className="text-md font-bold text-white ">Level: 1 | PS: 100</p>
          </div>
          {isPurchased && (
            <div className="absolute top-[-25] left-[-20] bg-blue-400/70 rounded-lg z-2 p-2">
              <p className="text-md font-bold text-white ">In your pokedex</p>
            </div>
          )}
        </div>
        <h3 className="text-lg mt-2 text-left text-muted-foreground"># {pokemon.numberPokemon <= 9 ? `00${pokemon.numberPokemon}` : pokemon.numberPokemon <= 99 ? `0${pokemon.numberPokemon}` : pokemon.numberPokemon}</h3>
        <h3 className="text-2xl font-bold mb-2 text-left">{pokemon.name}</h3>

        <p className="text-lg text-muted-foreground text-right mb-2">{FormatPrice(pokemon.priceRandom, pokemon.currencyKey)}</p>

        {isPurchased ? (
          // Refund
          <div className="flex w-full items-center gap-2 justify-end">
            <div className="flex items-center gap-2 justify-end rounded-xl border-2 border-border pl-2">
              <p className="text-lg font-bold text-muted-foreground">{FormatPrice(pokemon.price, "USD")}</p>
              <button className={`flex items-center justify-center gap-2 bg-red-400/70 rounded-br-lg rounded-tr-lg p-2 cursor-pointer hover:bg-red-400/80 transition-all duration-200`} onClick={() => handleReimbursing(pokemon.uuid)}>
                <Icon icon="mynaui:pokeball-solid" className="w-6 h-6" />
                <p className="text-normal sm:text-md flex gap-2 break-words"> Refund</p>
              </button>
            </div>
          </div>
        ) : (
          // Add to cart
          <div className="flex w-full items-center gap-2 justify-end">
            <div className="flex items-center gap-2 justify-end rounded-xl border-2 border-border pl-2">
              <p className="text-lg font-bold text-muted-foreground">{FormatPrice(pokemon.price, "USD")}</p>
              <button className={`flex items-center gap-2 bg-border rounded-br-lg rounded-tr-lg p-2 cursor-pointer hover:bg-border/50 transition-all duration-200`} onClick={() => handleAddToCart(pokemon.uuid)}>
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
