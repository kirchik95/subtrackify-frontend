import { Button } from '@/components/ui/button';

export const CurrentPlanCard = () => {
  return (
    <div className="flex w-[420px] shrink-0 flex-col justify-between gap-6 rounded-3xl bg-foreground p-8 shadow-[0_4px_12px_#0000000D]">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium text-muted-foreground">Current Plan</span>
        <h3 className="text-[40px] font-semibold leading-12 tracking-[-0.02em] text-white">Pro</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-[28px] font-semibold leading-[34px] tracking-[-0.02em] text-white">
            $9.99
          </span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="h-10 rounded-xl bg-white px-4 text-sm font-medium text-foreground hover:bg-white/90"
        >
          Upgrade
        </Button>
        <Button
          variant="outline"
          className="h-10 rounded-xl border-[#3F3F46] bg-transparent px-4 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-white"
        >
          Cancel Plan
        </Button>
      </div>
    </div>
  );
};
