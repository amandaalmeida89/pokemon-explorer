import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toUpperCase } from '../utils/formatter'
import { PokemonAbility } from '../types/Pokemon';
import { Stack } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

type Props = {
  page: number,
  image: string,
  loading: boolean,
  pokemonName: string,
  abilities: PokemonAbility[]
}

export const PokemonCard: FC<Props> = ({ page, image, loading, pokemonName, abilities }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    return navigate('/', { state : { page } });
  };

  const ButtonAction = styled(CardActions)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'end',
    padding: theme.spacing(2),
  }));

  return (
    <Card sx={{ width: '100%', maxWidth: 500, padding:'16px' }}>
      <Stack display={'flex'} sx={{ flexDirection: { xs: "column", md: "row", lg: "row" }}}>
        {loading ? (
          <>
            <Skeleton animation="wave" variant="rounded" width={'50%'} height={200} />
            <Stack padding={'16px'} width={'60%'}>
              <Skeleton animation="wave" variant="rounded" height={40} />
              <Skeleton sx={{marginTop: '12px'}} animation="wave" variant="rounded" width={'50%'} height={32} />
              <Skeleton sx={{marginTop: '8px'}} animation="wave" variant="rounded" width={'40%'} height={32} />
            </Stack>
          </>
          ):(
          <>
            <CardMedia
              sx={{ height: 215, width: 215, display: 'flex' }}
              image={image}
              title="pokemon image"/>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {toUpperCase(pokemonName)}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Abilities:
              </Typography>
              <Stack direction="row" spacing={1}>
                {abilities.map(({ ability }, index)=>
                  <Chip key={index} label={ability.name} />
                )}
              </Stack>
            </CardContent>
          </>
        )}
      </Stack>
      <ButtonAction>
        <Button variant="contained" size="small"
          onClick={handleBack}>Back</Button>
      </ButtonAction>
    </Card>
  )
}