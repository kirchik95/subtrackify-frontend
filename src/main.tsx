import { StrictMode } from 'react';
import { RouterProvider } from 'react-router';

import { GoogleOAuthProvider } from '@react-oauth/google';
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

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
