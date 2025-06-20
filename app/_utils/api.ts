import { axiosInstance, axiosInstanceCoins } from "./axios";

const API_KEY_COINS = process.env.NEXT_PUBLIC_API_KEY_COINS;

export default {
  apiPokemon:{
    getAllPokemons: async () => {
      const response = await axiosInstance.get("/pokemon?limit=151");
      return response.data;
    }
  },
  apiCoins:{
    getCoins: async () => {
      const response = await axiosInstanceCoins.get(`/v1/latest?apikey=${API_KEY_COINS}`);
      return response.data;
    }
  },
}