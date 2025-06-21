export type TypePokemon = {
  uuid: string;
  numberPokemon: number;
  name: string;
  imagePokemon: string;
  price: number;
  offert: number;
  priceRandom: number;
  currencyKey: string;
  isPurchased: boolean;
}

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonDetail = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  height: number;
  weight: number;
};