import { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {  parsedNumner } from '../utils/formatter';
import { PokemonAbility, AbilitiesResponse } from '../types/Pokemon';
import { Stack } from '@mui/system';
import { PokemonCard } from '../components/PokemonCard';
import { Context } from '../services/ContextProvider';
import Alert from '@mui/material/Alert';

export const PokemonDetails = () => {
  const [abilities, setAbilities] = useState<PokemonAbility[]>([]);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const { fetchByName, error } = useContext(Context);

  const { state } = useLocation();
  const params = useParams();
  const { name } = params || {};

  const pokemonName = state?.name || name;
  const page = state?.page;

  useEffect(() => {
    fetchByName(pokemonName)
    .then((list: AbilitiesResponse) => {
      const { abilities, id } = list || {};
      const parsedId = parsedNumner(id || 1, 3, '0');
      const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${parsedId}.png`;
      setImage(imageUrl);
      setAbilities(abilities || []);
      setLoading(false);
    });
  }, [pokemonName, fetchByName]);

  return (
    <Stack display={'flex'} alignItems={'center'} marginTop={'48px'}>
      {error ?
        <Alert sx={{marginTop: '40px'}} severity="error">{error}</Alert>
        :
        <PokemonCard page={page} image={image} loading={loading} pokemonName={pokemonName} abilities={abilities}/>
      }
    </Stack>
  );
};