import { createBrowserRouter } from 'react-router';

import { App } from '../../App';
import { AuthInitializer } from '../../features/auth/components';
import { Analytics } from '../../pages/Analytics';
import { ForgotPassword } from '../../pages/ForgotPassword';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { NotFound } from '../../pages/NotFound';
import { Profile } from '../../pages/Profile';
import { Register } from '../../pages/Register';
import { SubscriptionDetail } from '../../pages/SubscriptionDetail';
import { AuthLayout } from '../ui/AuthLayout';
import { ProtectedRouter } from './ProtectedRouter';
import { PublicRoute } from './PublicRoute';

export const router = createBrowserRouter([
  {
    element: (
      <AuthInitializer>
        <PublicRoute>
          <AuthLayout />
        </PublicRoute>
      </AuthInitializer>
    ),
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
    ],
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
      {
        path: 'list',
        element: <Home />,
      },
      {
        path: 'calendar',
        element: <Home />,
      },
      {
        path: 'subscription/:id',
        element: <SubscriptionDetail />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
