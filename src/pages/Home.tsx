import { SubscriptionsList } from '../features/subscriptions/components/SubscriptionsList';

export const Home = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome to Subtrackify</h1>
        <p className="mt-4 text-gray-600">Track and manage your subscriptions all in one place.</p>
      </div>
      <SubscriptionsList />
    </div>
  );
};
