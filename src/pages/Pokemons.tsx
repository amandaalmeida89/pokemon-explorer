import { useEffect, useState } from 'react';
import { fetchList } from "../services/fetcher";
import { useLocation } from 'react-router-dom';
import { PokemonList } from '../components/PokemonList'
import { Pokemon } from '../types/Pokemon';
import { Stack } from '@mui/system';
import Pagination from '@mui/material/Pagination';

export const Pokemons = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();

  const pagination = Math.ceil(pokemonCount/ 20);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPagination(value)
  };

  const setPagination = (value: number) => {
    setLoading(true)
    setPage(value);
    setOffset((value - 1) * 20)
  }

  useEffect(() => {
    const currentPage = state?.page
    if(currentPage) {
      setPagination(currentPage)
    }
  }, [state?.page]);

  useEffect(() => {
    fetchList(offset)
    .then((list) => {
      const { results, count } = list || {}
      setPokemonList(results || [])
      setPokemonCount(count || 0)
      setLoading(false)
    })
  }, [offset]);

  return (
    <>
      <Stack marginTop={'40px'} minHeight={'488px'}>
        <PokemonList page={page} loading={loading} list={pokemonList}/>
      </Stack>
      <Stack marginBottom={'40px'} marginTop={'5%'} display={'flex'} alignItems={'center'} spacing={2}>
        <Pagination color="primary" count={pagination} page={page} onChange={handleChange} />
      </Stack>
    </>
  )
}