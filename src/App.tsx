import { Stack, Container } from '@mui/system';
import { Footer } from './components/Footer';
import { PropsWithChildren } from 'react';
import { ContextProvider } from './services/ContextProvider';
import CardMedia from '@mui/material/CardMedia';
import Logo from './assets/logo.png';

export const App = ({ children }: PropsWithChildren) => {

  return (
    <ContextProvider>
      <Stack display={'flex'} justifyContent={'space-between'} minHeight={'100vh'}>
        <Container sx={{display: 'flex', flexDirection: 'column'}}>
          <Stack display={'flex'} alignItems={'center'} marginTop={'16px'}>
            <CardMedia
              sx={{ height: '100px', width: '300px'}}
              image={Logo}
              title="logo"/>
          </Stack>
          {children}
        </Container>
        <Footer></Footer>
      </Stack>
    </ContextProvider>
  );
};
