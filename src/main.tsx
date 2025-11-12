import { StrictMode } from 'react';
import { RouterProvider } from 'react-router';

import { ThemeProvider } from 'next-themes';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './assets/styles/index.css';

import { router } from './common/router';
import { store } from './common/store/store';

import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/open-sans';
import '@fontsource-variable/ibm-plex-sans';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
