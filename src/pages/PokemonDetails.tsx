import { useEffect, useState, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Context } from '../services/ContextProvider';
import { AbilitiesResponse, PokemonDetails as PokemonTypeDetails} from '../types/Pokemon';
import { parseImageUrl } from '../utils/formatter';
import { Stack } from '@mui/system';
import Alert from '@mui/material/Alert';
import { PokemonCard } from '../components/PokemonCard';

export const PokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonTypeDetails>({});
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
      const { abilities, id, types } = list || {};
      const imageUrl = parseImageUrl(id);
      const pokemonDetails = {
        image: imageUrl,
        abilities: abilities || [],
        types
      };
      setPokemonDetails(pokemonDetails);
      setLoading(false);
    });
  }, [pokemonName, fetchByName]);

  return (
    <Stack display={'flex'} alignItems={'center'} marginTop={'48px'}>
      {error ?
        <Alert sx={{marginTop: '40px'}} severity="error">{error}</Alert>
        :
        <PokemonCard page={page} loading={loading} pokemonName={pokemonName} pokemonDetails={pokemonDetails}/>
      }
    </Stack>
  );
};