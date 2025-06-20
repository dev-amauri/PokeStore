type Pokemon = {
  name: string;
  url: string;
};

type Currency = {
  [key: string]: number;
};
 // ------------------------------------------------------------

export function generatePokemonList( pokemons: Pokemon[], currency: Currency, offer: number = 0 ) {
  const currencyKeys = ['USD', 'EUR', 'JPY', 'MXN', 'CAD'];

  const usdValue = currency["USD"];

  const getRandomCurrencyPrice = () => {
    const randomCoin = currencyKeys[Math.floor(Math.random() * currencyKeys.length)];
    const randomCoinValue = currency[randomCoin];

    // generate random price in base currency
    const randomPrice = +(Math.random() * 99 + 1).toFixed(2);
    const priceUSD = +(randomPrice * (usdValue / randomCoinValue)).toFixed(2);

    // generate offert in base currency
    const offert = +(randomPrice - (randomPrice * offer)).toFixed(2);
    const offertUSD = +(priceUSD - (priceUSD * offer)).toFixed(2);

    return {
      priceRandom: randomPrice,
      price: priceUSD,
      offert: offertUSD,
      coin: randomCoin,
    };
  };


  return pokemons.map((pokemon, index) => {
    const numberPokemon = index + 1;
    const uniqueKey = `${numberPokemon}-${pokemon.name}`;
    const { price, priceRandom, offert, coin } = getRandomCurrencyPrice();

    return {
      uuid: uniqueKey,
      numberPokemon,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      imagePokemon: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${numberPokemon}.svg`,
      price: price,
      priceRandom: priceRandom,
      offert: offert,
      isPurchased: false,
      currencyKey: coin,
    };
  });
}

