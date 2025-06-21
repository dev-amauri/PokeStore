'use client'

import React from 'react';
import ModalCustom from '../ModalCustom';
import { useCartStore } from '@/app/_stores/useCartStore';
import { FormatPrice } from '@/app/_utils/formatNumber';
import CardCart from '../CardCart';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useWalletStore } from '@/app/_stores/useWalletStore';
import { usePurchasedStore } from '@/app/_stores/usePurchasedStore';
import { useCatalogStore } from '@/app/_stores/useCatalogStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSound } from 'use-sound';

export default function ModalCart({isOpenModalCart, setIsOpenModalCart}: {isOpenModalCart: boolean, setIsOpenModalCart: (isOpen: boolean) => void}) {
  const { cart, clearCart } = useCartStore();
  const { wallet, removeFunds } = useWalletStore();
  const { addMultiplePurchasedPokemons } = usePurchasedStore();
  const { updatePokemonPurchasedStatus } = useCatalogStore();
  const [play] = useSound('/sounds/buyPokemon.mp3', { volume: 0.5 });

  const CalculateTotal = () => {
    return cart.reduce((acc, pokemon) => acc + pokemon.price, 0);
  }

  const total = CalculateTotal();
  const isInsufficientFunds = total > wallet;

  const handleBuy =() => {
    removeFunds(total);
    // add pokemon to purchased list
    addMultiplePurchasedPokemons(cart);

    // actualize the status of the pokemon purchased in the catalog
    cart.forEach(pokemon => {
      updatePokemonPurchasedStatus(pokemon.uuid, true);
    });

    clearCart();
    setIsOpenModalCart(false);
    toast.success("Pokémons bought successfully!");
  }

  return (
      <ModalCustom open={isOpenModalCart} onClose={() => {setIsOpenModalCart(false)}} title="Shopping Cart">
        <div className='flex flex-col gap-4 '>
          <p className='text-md text-gray-500'>Available balance: ${wallet.toFixed(2)} USD</p>

          {cart.length <= 0 && (
            <div className='flex flex-col gap-2 items-center justify-center'>
              <div className='relative flex items-center justify-center'>
                <Icon icon="heroicons:shopping-bag" className='text-[10rem] text-gray-500' />
                <Icon icon="mdi:pokeball" className='text-[3rem] text-gray-500 absolute top-19' />
              </div>
              <p className='text-md text-gray-500 text-center'>Add pokemons to your cart</p>
              <Link href="/catalog">
              <button className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-200' onClick={() => setIsOpenModalCart(false)}>See catalog</button>
              </Link>
            </div>
          )}

          {cart.length > 0 && (
            <div className='flex flex-col gap-2'>
              <div className='w-full h-[300px] overflow-y-auto overflow-x-hidden flex flex-col gap-2 pr-4'>
                {cart.map((pokemon) => (
                  <CardCart key={pokemon.uuid} pokemon={pokemon} />
                ))}
              </div>

              <p className='text-lg text-gray-500 text-right font-bold mt-4'> Total: {FormatPrice(total, "USD")}</p>

              {isInsufficientFunds && (
                <div className='flex items-center gap-2 text-orange-600 text-sm'>
                  <Icon icon="heroicons:exclamation-triangle" className='text-lg' />
                  <span>Insufficient funds</span>
                </div>
              )}
              <button
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  isInsufficientFunds
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'
                }`}
                disabled={isInsufficientFunds}
                onClick={() => {handleBuy(); play()}}
              >
                Buy
              </button>
            </div>
          )}
        </div>
      </ModalCustom>
  )
}