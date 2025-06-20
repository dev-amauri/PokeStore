import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WalletState {
  wallet: number;
  addFunds: (amount: number) => void;
  removeFunds: (amount: number) => void;
  clearWallet: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      wallet: 0,
      addFunds: (amount: number) => set((state: WalletState) => ({ wallet: state.wallet + amount })),
      removeFunds: (amount: number) => set((state: WalletState) => ({ wallet: state.wallet - amount })),
      clearWallet: () => set({ wallet: 0 }),
    }),

    {
      name: "wallet",
      storage: createJSONStorage(() => localStorage),
    }
  )
)