import { createBrowserRouter } from 'react-router';

import { App } from '../../App';
import { AuthInitializer } from '../../features/auth/components';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { NotFound } from '../../pages/NotFound';
import { Register } from '../../pages/Register';
import { ProtectedRouter } from './ProtectedRouter';
import { PublicRoute } from './PublicRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <AuthInitializer>
        <PublicRoute>
          <Login />
        </PublicRoute>
      </AuthInitializer>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthInitializer>
        <PublicRoute>
          <Register />
        </PublicRoute>
      </AuthInitializer>
    ),
  },
  {
    path: '/',
    element: (
      <AuthInitializer>
        <ProtectedRouter>
          <App />
        </ProtectedRouter>
      </AuthInitializer>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
