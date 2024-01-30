import { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Context } from '../services/ContextProvider';
import { PokemonAbility, AbilitiesResponse } from '../types/Pokemon';
import { Stack } from '@mui/system';
import Alert from '@mui/material/Alert';
import { PokemonCard } from '../components/PokemonCard';
import { parseImageUrl } from '../utils/formatter';

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
      const imageUrl = parseImageUrl(id)
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