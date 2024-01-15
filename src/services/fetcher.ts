import { AbilitiesResponse, PokemonList } from '../types/Pokemon'
const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon'

export const fetcher = <T>(url: string) => {
  const requestUrl = `${POKEMON_API}${url}`
  return fetch(requestUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro de rede: ${response.status} - ${response.statusText}`);
      }
      return response.json() as Promise<T>;
    })
    .catch((error: Error) => {
      console.error('Erro durante a requisição:', error.message);
    });
}

export const fetchList = (offset: number) => {
  const url = `?offset=${offset}`
  return fetcher<PokemonList>(url)
}

export const fetchByName = (name: string) => {
  const url =`/${name}`
  return fetcher<AbilitiesResponse>(url)
}
