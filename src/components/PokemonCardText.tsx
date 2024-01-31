import { FC } from 'react';
import { Stack } from '@mui/system';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

type Props = {
  title: string,
  tags: { name: string }[]
}

export const PokemonCardText: FC<Props> = ({ title, tags }) => {
  const getChipsColor = (number: number) => {
    if (number % 2 === 0) {
      return 'primary';
    }
    return 'secondary';
  };

  return (
    <>
      <Typography marginTop={'8px'} gutterBottom variant="h6">
        {title}
      </Typography>
      <Stack direction="row" spacing={1}>
        {tags?.map(({ name }, index) =>
          <Chip color={getChipsColor(index)} key={index} label={name} />
        )}
      </Stack>
    </>
  );
};