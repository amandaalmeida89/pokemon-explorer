import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PokemonInfo } from '../types/Pokemon';
import { toUpperCase, parseImageUrl, parsedNumber } from '../utils/formatter';
import { Grid, Paper, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import './PokemonList.css';

type Props = {
  page: number,
  list: PokemonInfo[],
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

  const parsedId = (id: number) => {
    return parsedNumber(id || 1, 3, '0');
  };

  const imageSize = (id: number) => {
    if (id <= 1025) {
      return 80;
    }
    return 50;
  };

  return (
    <Grid container spacing={1}>
      {list.map(({ name, id }, index)=>
        <Grid display={'flex'} justifyContent={'center'} key={index} item xs={12} sm={12} md={3}>
          {loading ?
            <Skeleton animation="wave" variant="rounded" width={314} height={60} />
            :
            <Link className='item' to={`details/${name}`} state={{ name, page }}>
              <DemoPaper>
                <CardMedia
                  sx={{ height: imageSize(id), width: imageSize(id), marginRight: '16px'}}
                  image={parseImageUrl(id)}
                  title="pokemon"/>
                <Stack alignItems={'center'}>
                  <Typography gutterBottom component="div">
                    #{parsedId(id)}
                  </Typography>
                  <Typography gutterBottom component="div">
                  {toUpperCase(name)}
                  </Typography>
                </Stack>
              </DemoPaper>
            </Link>
         }
        </Grid>
      )}
    </Grid>
  );
};