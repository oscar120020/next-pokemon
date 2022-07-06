import { pokeApi } from "../api";
import { Pokemon } from "../interfaces";

export const getPokemonInfo = async(value: string) => {

  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${value}`);
  
    const pokemon = {
      name: data?.name,
      id: data?.id,
      sprites: data?.sprites,
    };
    return pokemon;
  } catch (error) {
    return null
  }

};
