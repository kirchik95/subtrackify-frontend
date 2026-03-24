import { Button } from '@/components/ui/button';

interface PaymentMethod {
  id: string;
  brand: string;
  brandColor: string;
  brandLabel: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

const MOCK_METHODS: PaymentMethod[] = [
  {
    id: '1',
    brand: 'Visa',
    brandColor: '#1A1F71',
    brandLabel: 'VISA',
    last4: '4242',
    expiry: '12/2027',
    isDefault: true,
  },
  {
    id: '2',
    brand: 'Mastercard',
    brandColor: '#EB001B',
    brandLabel: 'MC',
    last4: '8888',
    expiry: '06/2026',
    isDefault: false,
  },
];

export const PaymentMethodCard = () => {
  return (
    <div className="flex flex-1 flex-col gap-6 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Payment Method</h2>
        <Button variant="outline" className="h-10 rounded-xl px-4 text-sm">
          Add new
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_METHODS.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between rounded-2xl border border-border bg-secondary/50 p-5"
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-8 w-12 items-center justify-center rounded-md"
                style={{ backgroundColor: method.brandColor }}
              >
                <span className="text-[11px] font-bold text-white">{method.brandLabel}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">
                  {method.brand} ending in {method.last4}
                </span>
                <span className="text-[13px] text-muted-foreground">Expires {method.expiry}</span>
              </div>
            </div>
            {method.isDefault && (
              <span className="rounded-lg bg-[#DCFCE7] px-2.5 py-1 text-xs font-medium text-[#16A34A]">
                Default
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
