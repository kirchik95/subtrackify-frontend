import { useSearchParams } from 'react-router';

import { pageVariants, sectionVariants, tabContentVariants } from '@/common/animations/page';
import { useAppSelector } from '@/common/store/hooks';
import { getUserSelector } from '@/features/auth/store/selectors';
import { BillingTab } from '@/features/profile/components/BillingTab';
import { PreferencesTab } from '@/features/profile/components/PreferencesTab';
import { ProfileSkeleton } from '@/features/profile/components/ProfileSkeleton';
import { ProfileTab } from '@/features/profile/components/ProfileTab';
import { AnimatePresence, motion } from 'motion/react';

import { cn } from '@/lib/utils';

const TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'billing', label: 'Billing' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const TAB_TITLES: Record<TabId, { title: string; description: string }> = {
  profile: {
    title: 'Profile Settings',
    description: 'Manage your personal information and preferences.',
  },
  preferences: {
    title: 'Preferences',
    description: 'Customize your app experience and notifications.',
  },
  billing: {
    title: 'Billing',
    description: 'Manage your subscription plan and payment methods.',
  },
};

export const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useAppSelector(getUserSelector);

  const activeTab = (searchParams.get('tab') as TabId) || 'profile';
  const { title, description } = TAB_TITLES[activeTab] || TAB_TITLES.profile;

  const handleTabChange = (tab: TabId) => {
    if (tab === 'profile') {
      setSearchParams({});
    } else {
      setSearchParams({ tab });
    }
  };

  if (!user) return <ProfileSkeleton />;

  return (
    <motion.div
      className="flex flex-col gap-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.div className="flex items-end justify-between" variants={sectionVariants}>
        <div>
          <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.02em] text-foreground">
            {title}
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground">{description}</p>
        </div>

        <nav className="flex items-center gap-8 border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                '-mb-px pb-3 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-b-2 border-foreground text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={tabContentVariants}
        >
          {activeTab === 'profile' && <ProfileTab user={user} />}
          {activeTab === 'preferences' && <PreferencesTab />}
          {activeTab === 'billing' && <BillingTab />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
