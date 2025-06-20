'use client';
import React from 'react';
import { Icon } from '@iconify/react';
import { ThemeToggle } from '../_theme/ThemeToggle';
import Link from 'next/link';
import { useState } from 'react';
import ModalWallet from './Modals/ModalWallet';
import { useWalletStore } from '@/app/_stores/useWalletStore';

export default function Navbar() {
  const { wallet } = useWalletStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalWallet, setIsOpenModalWallet] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center p-6 border-b border-border bg-card">
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
              <div className='absolute top-23 left-0 w-full h-auto bg-card flex items-start gap-2 flex-col p-4'>
                <button className='flex items-center gap-2 p-1 cursor-pointer hover:bg-border w-full h-10 rounded-lg' onClick={() => { setIsOpenModalWallet(true); setIsOpen(false) }}>
                  <Icon icon="streamline-plump:wallet" className="w-8 h-8 border-r-2 border-border pr-2" />
                  <span className='text-md font-medium pr-2'> ${wallet} USD</span>
                </button>
                <button className='flex items-center gap-2  p-1 cursor-pointer hover:bg-border w-full h-10 rounded-lg'>
                  <Icon icon="ion:cart-outline" className="w-7 h-7" />
                  <span className='text-md font-medium pr-2'> Cart</span>
                </button>
                <button className='flex items-center gap-2  p-1 cursor-pointer hover:bg-border w-full h-10 rounded-lg'>
                  <Icon icon="qlementine-icons:user-16" className="w-7 h-7" />
                  <span className='text-md font-medium pr-2'> Profile</span>
                </button>
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
              <span className='text-md font-medium pr-2'> ${wallet} USD</span>
            </button>
            <button className='cursor-pointer hover:bg-border rounded-[999px] p-2'>
              <Icon icon="ion:cart-outline" className="w-7 h-7" />
            </button>
            <button className='cursor-pointer hover:bg-border rounded-[999px] p-2'>
              <Icon icon="qlementine-icons:user-16" className="w-7 h-7" />
            </button>
          </div>

        </div>

      </div>

      {/* Modal Wallet */}
      <ModalWallet isOpenModalWallet={isOpenModalWallet} setIsOpenModalWallet={setIsOpenModalWallet} />
    </>
  )
}