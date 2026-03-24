import { Button } from '@/components/ui/button';

export const DataExportCard = () => {
  return (
    <div className="flex w-[420px] shrink-0 flex-col gap-6 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
      <h2 className="text-lg font-semibold text-foreground">Data & Export</h2>

      <div className="flex flex-col gap-4">
        <p className="text-[13px] leading-5 text-muted-foreground">
          Export your subscription data or import from another service.
        </p>
        <div className="flex gap-3">
          <Button className="h-10 rounded-xl px-4 text-sm">Export CSV</Button>
          <Button variant="outline" className="h-10 rounded-xl px-4 text-sm">
            Import
          </Button>
        </div>
      </div>
    </div>
  );
};
