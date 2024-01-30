import { createBrowserRouter } from 'react-router-dom';
import { Pokemons } from '../pages/Pokemons';
import { PokemonDetails } from '../pages/PokemonDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Pokemons/>,
  },
  {
    path: 'details/:name',
    element: <PokemonDetails/>,
  }
]);
