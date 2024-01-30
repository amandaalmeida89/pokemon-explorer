type ErrorHandler = (errorMessage: string) => void;

export const PokemonApiService = (onError: ErrorHandler = () => {}) => {
  const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';

  const fetcher = async (path: string) => {
    const requestUrl = `${POKEMON_API}${path}`;

    try {
      const response = await fetch(requestUrl);
      if (!response.ok) {
        const message = `Failed to fetch data from ${requestUrl}`;
        onError(message);
        throw new Error(message);
      }

      return response.json();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      onError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const fetchList = (offset: number) => fetcher(`?offset=${offset}`);
  const fetchByName = (name: string) => fetcher(`/${name}`);

  return { fetchList, fetchByName };
};
