import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './routes/routes';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import './index.css';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <App>
          <RouterProvider router={router} />
        </App>
    </ThemeProvider>
  </React.StrictMode>,
);
