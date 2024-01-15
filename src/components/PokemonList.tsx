import { FC } from 'react';
import { Link } from "react-router-dom";
import { Grid, Paper, Skeleton } from '@mui/material';
import { Pokemon } from '../types/Pokemon'
import { toUpperCase } from '../utils/formatter'
import { styled } from '@mui/material/styles';
import pokeballImage from '../assets/pokeball.png';
import CardMedia from '@mui/material/CardMedia';
import './PokemonList.css'

type Props = {
  page: number,
  list: Pokemon[],
  loading: boolean
}

const DemoPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  width: '100%',
  padding: theme.spacing(2),
}));

export const PokemonList: FC<Props> = ({ page, list, loading }) => {

  return (
    <Grid container spacing={4}>
      {list.map(({ name }, index)=>
        <Grid display={'flex'} justifyContent={'center'} key={index} item xs={12} sm={12} md={3}>
          {loading ?
            <Skeleton animation="wave" variant="rounded" width={314} height={60} />
            :
            <Link className='item' to={`details/${name}`} state={{ name, page }}>
              <DemoPaper>
                <CardMedia
                  sx={{ height: 40, width: 40, marginRight: '16px'}}
                  image={pokeballImage}
                  title="Pokeball"/>
                {toUpperCase(name)}
              </DemoPaper>
            </Link>
         }
        </Grid>
      )}
    </Grid>
  )
}