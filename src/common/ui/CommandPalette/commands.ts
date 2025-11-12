import { LogOut, Plus, type LucideIcon } from 'lucide-react';

import { subscriptionActions } from '../../../features/subscriptions/store/slice';
import type { AppDispatch } from '../../store/store';

export interface CommandItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  onSelect: (dispatch: AppDispatch, setOpen: (open: boolean) => void) => void;
}

export const getCommands = (): CommandItemConfig[] => [
  {
    id: 'add-subscription',
    label: 'Add Subscription',
    icon: Plus,
    onSelect: (dispatch, setOpen) => {
      setOpen(false);
      dispatch(subscriptionActions.setAddSubscriptionOpen(true));
    },
  },
  {
    id: 'logout',
    label: 'Log out',
    icon: LogOut,
    onSelect: (_dispatch, setOpen) => {
      setOpen(false);
      // TODO: Implement logout logic
      console.log('Log out');
    },
  },
];
