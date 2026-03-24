import { Button } from '@/components/ui/button';

interface BillingEntry {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
}

const MOCK_HISTORY: BillingEntry[] = [
  {
    id: '1',
    date: 'Mar 1, 2026',
    description: 'Pro Plan — Monthly',
    amount: '$9.99',
    status: 'paid',
  },
  {
    id: '2',
    date: 'Feb 1, 2026',
    description: 'Pro Plan — Monthly',
    amount: '$9.99',
    status: 'paid',
  },
  {
    id: '3',
    date: 'Jan 1, 2026',
    description: 'Pro Plan — Monthly',
    amount: '$9.99',
    status: 'paid',
  },
];

const STATUS_STYLES: Record<BillingEntry['status'], string> = {
  paid: 'bg-[#DCFCE7] text-[#16A34A]',
  pending: 'bg-[#FEF9C3] text-[#CA8A04]',
  failed: 'bg-[#FEE2E2] text-[#DC2626]',
};

export const BillingHistoryCard = () => {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Billing History</h2>
        <Button variant="outline" className="h-10 rounded-xl px-4 text-sm">
          Download All
        </Button>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center border-b border-border py-3.5">
          <span className="flex-[2] text-[13px] font-medium text-muted-foreground">Date</span>
          <span className="flex-[3] text-[13px] font-medium text-muted-foreground">
            Description
          </span>
          <span className="flex-1 text-[13px] font-medium text-muted-foreground">Amount</span>
          <span className="flex-1 text-right text-[13px] font-medium text-muted-foreground">
            Status
          </span>
        </div>

        {MOCK_HISTORY.map((entry, index) => (
          <div
            key={entry.id}
            className={`flex items-center py-4 ${
              index < MOCK_HISTORY.length - 1 ? 'border-b border-secondary' : ''
            }`}
          >
            <span className="flex-[2] text-sm text-foreground">{entry.date}</span>
            <span className="flex-[3] text-sm text-foreground">{entry.description}</span>
            <span className="flex-1 text-sm font-medium text-foreground">{entry.amount}</span>
            <div className="flex flex-1 justify-end">
              <span
                className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLES[entry.status]}`}
              >
                {entry.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
