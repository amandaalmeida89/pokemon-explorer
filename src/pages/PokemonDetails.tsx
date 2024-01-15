import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchByName } from "../services/fetcher";
import {  parsedNumner } from '../utils/formatter'
import { PokemonAbility } from '../types/Pokemon';
import { Stack } from '@mui/system';
import { PokemonCard } from '../components/PokemonCard'

export const PokemonDetails = () => {
  const [abilities, setAbilities] = useState<PokemonAbility[]>([]);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const params = useParams()
  const { name } = params || {}

  const pokemonName = state?.name || name
  const page = state?.page

  useEffect(() => {
    fetchByName(pokemonName)
    .then((list) => {
      const { abilities, id } = list || {};
      const parsedId = parsedNumner(id || 1, 3, '0');
      const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${parsedId}.png`;
      setImage(imageUrl);
      setAbilities(abilities || []);
      setLoading(false)
    })
  }, [pokemonName]);

  return (
    <Stack display={'flex'} alignItems={'center'} marginTop={'48px'}>
      <PokemonCard page={page} image={image} loading={loading} pokemonName={pokemonName} abilities={abilities}/>
    </Stack>
  )
}