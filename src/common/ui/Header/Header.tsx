import { Link } from 'react-router';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { subscriptionActions } from '../../../features/subscriptions/store/slice';
import { useAppDispatch } from '../../store/hooks';
import { UserMenu } from './components/UserMenu';

export const Header = () => {
  const dispatch = useAppDispatch();

  const handleAddSubscription = () => {
    dispatch(subscriptionActions.setAddSubscriptionOpen(true));
  };

  return (
    <header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Subtrackify
          </Link>
          <div className="flex items-center gap-4">
            <Button onClick={handleAddSubscription} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Subscription
            </Button>

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};
