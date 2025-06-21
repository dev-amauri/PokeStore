'use client'

import React from 'react';
import ModalCustom from '../ModalCustom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useWalletStore } from '@/app/_stores/useWalletStore';

export default function ModalWallet({isOpenModalWallet, setIsOpenModalWallet}: {isOpenModalWallet: boolean, setIsOpenModalWallet: (isOpen: boolean) => void}) {
  const { wallet, addFunds, clearWallet } = useWalletStore();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(yup.object().shape({
      amount: yup.number().typeError('Amount must be a number').required('Amount is required').min(1, 'Amount must be greater than 0'),
    })),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = (data: {amount: number}) => {
    addFunds(data.amount);
    reset({amount: 0});
  }

  // Gift money to the wallet random between 20 and 110
  const handleGiftMoneyRandom = () => {
    addFunds(Math.floor(Math.random() * 91) + 20);
  }

  return (
    <ModalCustom open={isOpenModalWallet} onClose={() => {setIsOpenModalWallet(false); reset({amount: 0})}} title="Add funds to the wallet">
        <div className='flex flex-col gap-4'>
          <p className='text-md text-gray-500'>Available balance: ${wallet.toFixed(2)} USD</p>
          {/* Gift random money to the wallet */}
          {wallet <= 0 && (
            <button className='w-full h-full text-md font-medium cursor-pointer rounded-lg bg-blue-400/80 hover:bg-blue-500/90 text-white p-2' onClick={handleGiftMoneyRandom}>
              Gift money to the wallet
            </button>
          )}
          {/* Add funds to the wallet */}
          {wallet > 0 && (
            <>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 border-2 border-border rounded-lg'>
              <p className='text-md font-medium w-[60%] text-center'>$ 10 USD</p>
              <button className=' w-full h-full text-md font-medium cursor-pointer bg-green-400/60 hover:bg-green-400/80 border-l-2 border-border p-2 rounded-br-lg rounded-tr-lg' onClick={() => addFunds(10)}> Add Funds</button>
            </div>
            <div className='flex items-center gap-2 border-2 border-border rounded-lg'>
              <p className='text-md font-medium w-[60%] text-center'>$ 500 USD</p>
              <button className=' w-full h-full text-md font-medium cursor-pointer bg-green-400/60 hover:bg-green-400/80 border-l-2 border-border p-2 rounded-br-lg rounded-tr-lg' onClick={() => addFunds(500)}> Add Funds</button>
            </div>
          </div>

          <p className='text-md text-gray-500'>Custom amount</p>
          <form onSubmit={handleSubmit(onSubmit)} className='flex items-center flex-col gap-2'  >
            <div className='flex items-center border-2 border-border rounded-lg'>
              <input
                type="number"
                {...register("amount")}
                className="w-full h-full text-md font-medium cursor-pointer p-2"
                placeholder="$ 0.00 USD"
                min={0}
              />
              <button className=' w-full h-full text-md font-medium cursor-pointer bg-green-400/60 hover:bg-green-400/80 border-l-2 border-border p-2 rounded-br-lg rounded-tr-lg'> Add Funds</button>
            </div>
            {errors.amount && <p className='text-red-500 text-sm'>{errors.amount.message as string}</p>}

          </form>

          <p className='text-md text-gray-500'>Clear Wallet</p>
          <button className='w-full h-full text-md font-medium cursor-pointer rounded-lg bg-red-400/80 hover:bg-red-500/90 text-white p-2' onClick={() => clearWallet()}> Clear Wallet</button>
          </>
          )}
        </div>
      </ModalCustom>
  )
}