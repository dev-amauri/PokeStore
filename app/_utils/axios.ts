import axios from "axios";

const API_URL_POKEMON = process.env.NEXT_PUBLIC_API_URL_POKEMON;
const API_URL_COINS = process.env.NEXT_PUBLIC_API_URL_COINS;

// Axios instance for Pokemon API
export const axiosInstance = axios.create({baseURL:API_URL_POKEMON})

axiosInstance.interceptors.response.use(
  (response)=> response,
  (error)=> Promise.reject(new Error(error.response?.data && "Something went wrong"))
)

// Axios instance for Coins API
export const axiosInstanceCoins = axios.create({baseURL:API_URL_COINS })

axiosInstanceCoins.interceptors.response.use(
  (response)=> response,
  (error)=> Promise.reject(new Error(error.response?.data && "Something went wrong"))
)

