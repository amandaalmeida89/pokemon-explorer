import { Stack, Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Footer } from './components/Footer'
import { PropsWithChildren } from 'react'

export const App = ({ children }: PropsWithChildren) => {

  return (
    <Stack display={'flex'} justifyContent={'space-between'} height={'100vh'}>
      <Container sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography gutterBottom
          sx={{fontSize: { xs: "36px", md: "42px", lg: "48px" }}}
          marginTop={'40px'}
          textAlign={'center'}
          variant="h1"
          component="div">
          Pokemon species
        </Typography>
        {children}
      </Container>
      <Footer></Footer>
    </Stack>
  )
}
