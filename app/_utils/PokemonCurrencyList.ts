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

  const FormatPrice = (price: number, currencyKey: string) => {
    return `${currencyKey === "JPY" ? "¥" : currencyKey === "EUR" ? "€" : "$"}${price.toFixed(2)} ${currencyKey}`;
  };

  const getRandomCurrencyPrice = () => {
    const randomCoin = currencyKeys[Math.floor(Math.random() * currencyKeys.length)];
    const randomCoinValue = currency[randomCoin];

    // generate random price in base currency and apply format
    const randomPrice = +(Math.random() * 99 + 1).toFixed(2);
    const priceUSD = +(randomPrice * (usdValue / randomCoinValue)).toFixed(2);
    const formatPrice = FormatPrice(randomPrice, randomCoin);
    const formatPriceUSD = FormatPrice(priceUSD, "USD");

    // generate offert in base currency and apply format
    const offert = +(randomPrice - (randomPrice * offer)).toFixed(2);
    const offertUSD = +(priceUSD - (priceUSD * offer)).toFixed(2);
    const formatOffert = FormatPrice(offert, randomCoin);
    const formatOffertUSD = FormatPrice(offertUSD, "USD");

    return {
      price: formatPrice,
      priceUSD: formatPriceUSD,
      offert: formatOffert,
      offertUSD: formatOffertUSD,
      coin: randomCoin,
    };
  };


  return pokemons.map((pokemon, index) => {
    const numberPokemon = index + 1;
    const uniqueKey = `${numberPokemon}-${pokemon.name}`;
    const { price, priceUSD, offert, offertUSD, coin } = getRandomCurrencyPrice();

    return {
      uuid: uniqueKey,
      numberPokemon,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      imagePokemon: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${numberPokemon}.svg`,
      priceRandom: price,
      priceUSD: priceUSD,
      offert: offert,
      offertUSD: offertUSD,
      isPurchased: false,
      currencyKey: coin,
    };
  });
}

