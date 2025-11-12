import { Home, LogOut, Plus, type LucideIcon } from 'lucide-react';

import { subscriptionActions } from '../../../features/subscriptions/store/slice';
import type { AppDispatch } from '../../store/store';

export interface CommandContext {
  dispatch: AppDispatch;
  setOpen: (open: boolean) => void;
  navigate: (path: string) => void;
}

export interface CommandItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  onSelect: (context: CommandContext) => void;
}

export interface CommandSection {
  heading: string;
  commands: CommandItemConfig[];
}

export const getCommands = (): CommandSection[] => [
  {
    heading: 'Navigation',
    commands: [
      {
        id: 'go-to-home',
        label: 'Go to Home',
        icon: Home,
        onSelect: ({ setOpen, navigate }) => {
          setOpen(false);
          navigate('/');
        },
      },
    ],
  },
  {
    heading: 'Actions',
    commands: [
      {
        id: 'add-subscription',
        label: 'Add Subscription',
        icon: Plus,
        onSelect: ({ dispatch, setOpen }) => {
          setOpen(false);
          dispatch(subscriptionActions.setAddSubscriptionOpen(true));
        },
      },
    ],
  },
  {
    heading: 'Account',
    commands: [
      {
        id: 'logout',
        label: 'Log out',
        icon: LogOut,
        onSelect: ({ setOpen }) => {
          setOpen(false);
          // TODO: Implement logout logic
          console.log('Log out');
        },
      },
    ],
  },
];
