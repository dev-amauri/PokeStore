'use client';

import { useQuery } from "@tanstack/react-query";
import api from "../_utils/api";

type CurrencyData = {
  data: Record<string, number>;
};

type FilteredCurrency = {
  USD: number;
  EUR: number;
  JPY: number;
  MXN: number;
  CAD: number;
};

export const useCurrency = () => {
  return useQuery({
    queryKey: ["currency"],
    queryFn: api.apiCoins.getCoins,
    select: (data: CurrencyData): FilteredCurrency => {
      if (!data) return {} as FilteredCurrency;
      return {
        USD: data?.data?.USD,
        EUR: data?.data?.EUR,
        JPY: data?.data?.JPY,
        MXN: data?.data?.MXN,
        CAD: data?.data?.CAD,
      };
    }
  });
}