import { FC } from 'react';
import { toUpperCase } from '../utils/formatter';
import { PokemonDetails } from '../types/Pokemon';
import { Stack } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { PokemonCardText } from './PokemonCardText';

type Props = {
  page: number,
  handleBack: () => void,
  loading: boolean,
  pokemonName: string,
  pokemonDetails: PokemonDetails,
}

export const PokemonCard: FC<Props> = ({ handleBack, loading, pokemonName, pokemonDetails }) => {
  const { image, abilities, types } = pokemonDetails || {};

  const infoTags = [
    {
      title: 'Abilities',
      tags: abilities?.map(({ ability }) => {
        return { name: ability?.name };
      })
    },
    {
      title: 'Type',
      tags: types?.map(({ type }) => {
        return { name: type?.name };
      })
    }
  ];

  const ButtonAction = styled(CardActions)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'end',
    padding: theme.spacing(2),
  }));

  return (
    <Card sx={{ width: '100%', maxWidth: 600, padding:'16px' }}>
      <Stack display={'flex'} sx={{ flexDirection: { xs: 'column', md: 'row', lg: 'row' }}}>
        {loading ? (
          <>
            <Skeleton animation="wave" variant="rounded" width={'50%'} height={200} />
            <Stack padding={'16px'} width={'60%'}>
              <Skeleton animation="wave" variant="rounded" height={40} />
              <Skeleton sx={{marginTop: '12px'}} animation="wave" variant="rounded" width={'50%'} height={32} />
              <Skeleton sx={{marginTop: '8px'}} animation="wave" variant="rounded" width={'40%'} height={32} />
              <Skeleton sx={{marginTop: '8px'}} animation="wave" variant="rounded" width={'40%'} height={32} />
            </Stack>
          </>
          ):(
          <>
            <CardMedia
              sx={{ height: 215, width: '100%', maxWidth: 215, display: 'flex' }}
              image={image}
              title="pokemon image"/>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {toUpperCase(pokemonName)}
              </Typography>
              {infoTags.map(({ title, tags })=>
                <PokemonCardText title={title} tags={tags || []}></PokemonCardText>
              )}
            </CardContent>
          </>
        )}
      </Stack>
      <ButtonAction>
        <Button variant="contained" size="small"
          onClick={handleBack}>Back</Button>
      </ButtonAction>
    </Card>
  );
};