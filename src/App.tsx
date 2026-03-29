import { Outlet } from 'react-router';

import { Toaster } from '@/components/ui/sonner';

import { AddSubscriptionDialog } from './common/ui/AddSubscriptionDialog';
import { CommandPalette } from './common/ui/CommandPalette';
import { EditSubscriptionDialog } from './common/ui/EditSubscriptionDialog';
import { EmailVerificationBanner } from './common/ui/EmailVerificationBanner';
import { Header } from './common/ui/Header';

export const App = () => {
  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <EmailVerificationBanner />
        <main className="flex-1 overflow-y-auto px-10 py-10">
          <Outlet />
        </main>
      </div>

      <CommandPalette />
      <AddSubscriptionDialog />
      <EditSubscriptionDialog />
      <Toaster />
    </div>
  );
};
