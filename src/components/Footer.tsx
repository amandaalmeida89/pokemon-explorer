import { Stack } from '@mui/system';
import Typography from '@mui/material/Typography';

export const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <Stack sx={{bgcolor: 'info.main'}} padding={'16px'} display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
      <Typography marginRight={'8px'} color={'black'} variant="inherit" component="div">
        Copyright &copy; {currentYear} - by Amanda Nascimento
      </Typography>
      <a target='new' href='https://github.com/amandaalmeida89/pokemon-explorer'>
        <img width={30} height={30} src='/github.png' alt='github Logo'/>
      </a>
    </Stack>
  )
}