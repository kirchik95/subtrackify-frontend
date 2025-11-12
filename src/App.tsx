import { Outlet } from 'react-router';

import { Toaster } from '@/components/ui/sonner';

import { AddSubscriptionDialog } from './common/ui/AddSubscriptionDialog';
import { CommandPalette } from './common/ui/CommandPalette';
import { Header } from './common/ui/Header';

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="bg-white rounded-lg border border-gray-100 h-[calc(100vh-1rem)]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>

      <CommandPalette />
      <AddSubscriptionDialog />
      <Toaster />
    </div>
  );
};
