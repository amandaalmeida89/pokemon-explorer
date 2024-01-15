import { Stack } from '@mui/system';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

export const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <Stack sx={{bgcolor: 'info.main'}} padding={'16px'} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
      <Typography marginRight={'8px'} color={'black'} variant="inherit" component="div">
        Copyright &copy; {currentYear} - by Amanda Nascimento
      </Typography>
      <a target='new' href='https://github.com/amandaalmeida89/pokemon-explorer'>
        <CardMedia
          sx={{ height: 30, width: 30}}
          image='./github.png'
          title="github Logo"/>
      </a>
    </Stack>
  );
};