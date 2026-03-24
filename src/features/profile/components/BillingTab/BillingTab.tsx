import { BillingHistoryCard } from '../BillingHistoryCard';
import { CurrentPlanCard } from '../CurrentPlanCard';
import { PaymentMethodCard } from '../PaymentMethodCard';

export const BillingTab = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <CurrentPlanCard />
        <PaymentMethodCard />
      </div>

      <BillingHistoryCard />
    </div>
  );
};
