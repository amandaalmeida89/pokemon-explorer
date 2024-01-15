import { createContext, useState, PropsWithChildren } from 'react';
import { AbilitiesResponse, PokemonList } from '../types/Pokemon'
import { PokemonApiService } from './PokemonApiService';

type ContextProps = {
  fetchList: (offset: number) => Promise<PokemonList>;
  fetchByName: (name: string) => Promise<AbilitiesResponse>;
  error?: string
};

export const Context = createContext<ContextProps>(PokemonApiService());

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [error, setError] = useState('');

  const onError = (message: string) => {
    setError(message);
  }

  const { fetchList, fetchByName } = PokemonApiService(onError);

  const contextValue = {
    fetchList,
    fetchByName,
    error
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}