import { useRef, useState } from 'react';

import { profileApi } from '@/common/api';
import { useAppDispatch } from '@/common/store/hooks';
import { fetchSubscriptions } from '@/features/subscriptions/store/actions';
import { Download, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export const DataExportCard = () => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await profileApi.exportCsv();
      toast.success('Subscriptions exported successfully');
    } catch {
      toast.error('Failed to export subscriptions');
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const response = await profileApi.importCsv(file);
      if (response.success && response.data) {
        const { imported, errors } = response.data;
        if (errors.length > 0) {
          toast.warning(`Imported ${imported} subscriptions with ${errors.length} errors`);
        } else {
          toast.success(`Successfully imported ${imported} subscriptions`);
        }
        dispatch(fetchSubscriptions());
      } else {
        toast.error(response.error || 'Failed to import subscriptions');
      }
    } catch {
      toast.error('Failed to import subscriptions');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex w-[420px] shrink-0 flex-col gap-6 rounded-3xl border border-border bg-background p-8 shadow-[0_4px_12px_#00000005]">
      <h2 className="text-lg font-semibold text-foreground">Data & Export</h2>

      <div className="flex flex-col gap-4">
        <p className="text-[13px] leading-5 text-muted-foreground">
          Export your subscription data or import from another service.
        </p>
        <div className="flex gap-3">
          <Button
            className="h-10 rounded-xl px-4 text-sm"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Download className="mr-2 size-4" />
            )}
            Export CSV
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-xl px-4 text-sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
          >
            {isImporting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Upload className="mr-2 size-4" />
            )}
            Import
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>
    </div>
  );
};
