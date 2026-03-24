import { Link, useLocation } from 'react-router';

import { Layers, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

import { subscriptionActions } from '../../../features/subscriptions/store/slice';
import { useAppDispatch } from '../../store/hooks';
import { UserMenu } from './components/UserMenu';

const DASHBOARD_PATHS = ['/', '/list', '/calendar'];

const navLinks = [
  { label: 'Dashboard', href: '/' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Settings', href: '/settings' },
];

export const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleAddSubscription = () => {
    dispatch(subscriptionActions.setAddSubscriptionOpen(true));
  };

  return (
    <header className="flex items-center justify-between h-20 px-10 border-b border-border shrink-0 bg-white">
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <Layers className="size-6 text-foreground" strokeWidth={2} />
          <span className="text-lg font-semibold text-foreground">Subtrackify</span>
        </Link>
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? DASHBOARD_PATHS.includes(location.pathname)
                : location.pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors no-underline',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleAddSubscription}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          New
        </button>
        <UserMenu />
      </div>
    </header>
  );
};
