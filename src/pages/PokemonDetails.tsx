import { useEffect, useState, useContext } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Context } from '../services/ContextProvider';
import { AbilitiesResponse, PokemonDetails as PokemonTypeDetails} from '../types/Pokemon';
import { parseImageUrl } from '../utils/formatter';
import { Stack } from '@mui/system';
import { PokemonCard } from '../components/PokemonCard';
import { BackgroundError } from '../components/BackgroundError';

export const PokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonTypeDetails>({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { fetchByName } = useContext(Context);

  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();
  const { name } = params || {};

  const pokemonName = state?.name || name;
  const page = state?.page;

  const handleBack = () => {
    return navigate('/', { state : { page } });
  };

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
    }).catch(() => {
      setErrorMessage('Pokémon not found, return to main page to search again.');
    });
  }, [pokemonName, fetchByName]);

  return (
    <Stack display={'flex'} alignItems={'center'} marginTop={'48px'}>
      {errorMessage ?
        <BackgroundError handleAction={handleBack} errorMessage={errorMessage} buttonText='Back'/>
        :
        <PokemonCard handleBack={handleBack} page={page} loading={loading} pokemonName={pokemonName} pokemonDetails={pokemonDetails}/>
      }
    </Stack>
  );
};