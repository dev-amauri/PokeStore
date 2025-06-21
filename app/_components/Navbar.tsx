'use client';
import React from 'react';
import { Icon } from '@iconify/react';
import { ThemeToggle } from '../_theme/ThemeToggle';
import Link from 'next/link';
import { useState } from 'react';
import ModalWallet from './Modals/ModalWallet';
import { useWalletStore } from '@/app/_stores/useWalletStore';
import { useCartStore } from '@/app/_stores/useCartStore';
import ModalCart from './Modals/ModalCart';

export default function Navbar() {
  const { wallet } = useWalletStore();
  const { cart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalWallet, setIsOpenModalWallet] = useState(false);
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isUserCollapseOpen, setIsUserCollapseOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center p-6 border-b border-border bg-card fixed top-0 w-full z-50 ">
        <Link href="/" className='flex items-center gap-2' >
          <Icon icon="hugeicons:pokeball" className="w-8 h-8" />
          <h1 className='text-2xl font-bold'>PokeStore</h1>
        </Link>

        <div className='flex items-center gap-4'>
          {/*Mobile*/}

          <div className='md:hidden'>
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-2 border-2 border-border rounded-lg p-1 cursor-pointer hover:bg-border'>
              <Icon icon={isOpen ? "mingcute:close-line" : "solar:hamburger-menu-broken"} className="w-8 h-8" />
            </button>
            {isOpen && (
              <div className='absolute top-23 left-0 w-full h-auto bg-card flex items-start gap-2 flex-col p-4 z-50'>
                <button className='flex items-center gap-2 p-1 cursor-pointer hover:bg-border w-full h-10 rounded-lg' onClick={() => { setIsOpenModalWallet(true); setIsOpen(false) }}>
                  <Icon icon="streamline-plump:wallet" className="w-8 h-8 border-r-2 border-border pr-2" />
                  <span className='text-md font-medium pr-2'> ${wallet.toFixed(2)} USD</span>
                </button>
                <button className='flex items-center gap-2  p-1 cursor-pointer hover:bg-border w-full h-10 rounded-lg relative' onClick={() => { setIsOpenModalCart(true); setIsOpen(false) }}>
                  <Icon icon="ion:cart-outline" className="w-7 h-7" />
                  <span className='text-md font-medium pr-2'> Cart</span>
                  <span className='bg-red-500 text-white rounded-full text-xs w-4 h-4 flex absolute top-0 right-0 justify-center items-center'> {cart.length}</span>
                </button>


                <div className='w-full'>
                  <button
                    className='flex items-center gap-2 p-1 cursor-pointer hover:bg-border w-full h-10 rounded-lg justify-between'
                    onClick={() => setIsUserCollapseOpen(!isUserCollapseOpen)}
                  >
                    <div className='flex items-center gap-2'>
                      <Icon icon="qlementine-icons:user-16" className="w-7 h-7" />
                      <span className='text-md font-medium pr-2'> Profile</span>
                    </div>
                    <Icon
                      icon={isUserCollapseOpen ? "mingcute:up-line" : "mingcute:down-line"}
                      className="w-5 h-5"
                    />
                  </button>

                  {isUserCollapseOpen && (
                    <div className='ml-4 mt-2 space-y-2'>
                      <Link
                        href="/catalog"
                        className='flex items-center gap-2 p-2 cursor-pointer hover:bg-border rounded-lg'
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon icon="mdi:pokeball" className="w-6 h-6" />
                        <span className='text-sm font-medium'>Catalog</span>
                      </Link>
                      <Link
                        href="/my-pokemons"
                        className='flex items-center gap-2 p-2 cursor-pointer hover:bg-border rounded-lg'
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon icon="mdi:pokeball" className="w-6 h-6" />
                        <span className='text-sm font-medium'>My Pokémons</span>
                      </Link>
                    </div>
                  )}
                </div>

                <div className='w-full '>
                  <ThemeToggle isMobile={true} />
                </div>
              </div>
            )}
          </div>

          {/*Desktop*/}

          <div className='md:flex hidden items-center gap-4'>
            <ThemeToggle isMobile={false} />
            <button className='flex items-center gap-2 border-2 border-border rounded-lg p-1 cursor-pointer hover:bg-border' onClick={() => setIsOpenModalWallet(true)}>
              <Icon icon="streamline-plump:wallet" className="w-8 h-8 border-r-2 border-border pr-2" />
              <span className='text-md font-medium pr-2'> ${wallet.toFixed(2)} USD</span>
            </button>
            <button className='cursor-pointer hover:bg-border rounded-[999px] p-2 relative' onClick={() => setIsOpenModalCart(true)}>
              <Icon icon="ion:cart-outline" className="w-7 h-7" />
              <span className='bg-red-500 text-white rounded-full text-xs w-4 h-4 flex absolute top-0 right-0 justify-center items-center'> {cart.length}</span>
            </button>

            {/* User Menu Popover */}
            <div className="relative">
              <button
                className='cursor-pointer hover:bg-border rounded-[999px] p-2'
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <Icon icon="qlementine-icons:user-16" className="w-7 h-7" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="py-1">
                    <Link
                      href="/catalog"
                      className='flex items-center gap-2 px-4 py-2 text-sm hover:bg-border cursor-pointer'
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Icon icon="mdi:pokeball" className="w-5 h-5" />
                      <span>Catalog</span>
                    </Link>
                    <Link
                      href="/my-pokemons"
                      className='flex items-center gap-2 px-4 py-2 text-sm hover:bg-border cursor-pointer'
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Icon icon="mdi:pokeball" className="w-5 h-5" />
                      <span>My Pokémons</span>
                    </Link>

                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Modal Wallet */}
      <ModalWallet isOpenModalWallet={isOpenModalWallet} setIsOpenModalWallet={setIsOpenModalWallet} />
      <ModalCart isOpenModalCart={isOpenModalCart} setIsOpenModalCart={setIsOpenModalCart} />

      {/* Overlay for close the popover in outside */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </>
  )
}