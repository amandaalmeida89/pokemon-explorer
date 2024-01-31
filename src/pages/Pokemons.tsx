import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../services/ContextProvider';
import { PokemonInfo, PokemonList as List } from '../types/Pokemon';
import { Stack } from '@mui/system';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { PokemonList } from '../components/PokemonList';
import { BackgroundError } from '../components/BackgroundError';

export const Pokemons = () => {
  const [pokemonList, setPokemonList] = useState<PokemonInfo[]>([]);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [pokemonName, setPokemonName] = useState('');
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { state } = useLocation();
  const navigate = useNavigate();
  const { fetchList } = useContext(Context);
  const pagination = Math.ceil(pokemonCount/ 20);

  const isDisabled = pokemonName.length < 2;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPagination(value);
  };

  const handleSearch = () => {
    const name = pokemonName.toLowerCase();
    return navigate(`details/${name}`, { state : { name, page } });
  };

  const handleReload = () => {
    return navigate(0);
  };

  const setPagination = (value: number) => {
    setLoading(true);
    setPage(value);
    setOffset((value - 1) * 20);
  };

  useEffect(() => {
    const currentPage = state?.page;
    if (currentPage) {
      setPagination(currentPage);
    }
  }, [state?.page]);

  useEffect(() => {
    fetchList(offset)
    .then((list: List) => {
      const { results, count } = list || {};
      const formattedResults = results.map(({ name, url })=>{
        const urlPartner = 'https://pokeapi.co/api/v2/pokemon/';
        const pokemonId = url.replace(urlPartner, '').replace('/', '');
        return {
          name,
          id: parseInt(pokemonId)
        };
      });
      setPokemonList(formattedResults || []);
      setPokemonCount(count || 0);
      setLoading(false);
    }).catch(() => {
      setErrorMessage('Something went wrong.');
    });
  }, [offset, fetchList]);

  return (
    <>
      {errorMessage ?
        <BackgroundError handleAction={handleReload} errorMessage={errorMessage} buttonText='Reload'/>
        :
        <>
          <Stack flexDirection={'row'} justifyContent={'end'} marginTop={'16px'}>
            <TextField size='small' id="outlined-basic" label="Pokemon Name" variant="outlined"
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPokemonName(event.target.value);}}/>
            <Button sx={{marginLeft: '12px'}} variant="contained" startIcon={<SearchIcon />}
              onClick={handleSearch} disabled={isDisabled}>search</Button>
          </Stack>
          <Stack marginTop={'32px'} minHeight={'488px'}>
            <PokemonList page={page} loading={loading} list={pokemonList}/>
          </Stack>
          <Stack marginBottom={'30px'} marginTop={'3%'} display={'flex'} alignItems={'center'} spacing={2}>
            <Pagination color="primary" count={pagination} page={page} onChange={handleChange} />
          </Stack>
        </>
      }
    </>
  );
};