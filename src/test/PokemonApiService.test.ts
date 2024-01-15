import { PokemonApiService } from '../services/PokemonApiService';

describe('PokemonApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchList should return data for a successful request', async () => {
    const mockData = { data: 'mocked data' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const pokemonApi = PokemonApiService();
    const result = await pokemonApi.fetchList(0);

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0');
  });

  it('fetchByName should return data for a successful request', async () => {
    const mockData = { name: 'Pikachu' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const pokemonApi = PokemonApiService();
    const result = await pokemonApi.fetchByName('pikachu');

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pikachu');
  });

  it('should call onError and throw an error for a failed request', async () => {
    const errorMessage = 'Failed to fetch data from https://pokeapi.co/api/v2/pokemon?offset=0';

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    const onErrorMock = jest.fn();
    const pokemonApi = PokemonApiService(onErrorMock);

    await expect(pokemonApi.fetchList(0)).rejects.toThrowError(errorMessage);

    expect(onErrorMock).toHaveBeenCalledWith(errorMessage);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0');
  });

  it('should call onError and throw a custom error message for a network error', async () => {
    const errorMessage = 'Network Error';

    global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

    const onErrorMock = jest.fn();
    const pokemonApi = PokemonApiService(onErrorMock);

    await expect(pokemonApi.fetchList(0)).rejects.toThrowError(errorMessage);

    expect(onErrorMock).toHaveBeenCalledWith(errorMessage);
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0');
  });
});
