import { Skeleton } from '@/components/ui/skeleton';

export const AnalyticsSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Header skeleton */}
      <div>
        <Skeleton className="h-10 w-[140px]" />
        <Skeleton className="h-5 w-[320px] mt-2" />
      </div>

      {/* Summary cards skeleton */}
      <div className="grid grid-cols-4 gap-6">
        <div className="flex flex-col rounded-3xl gap-4 bg-[#09090B] shadow-[0_4px_12px_#0000000D] p-8">
          <div className="flex items-center gap-2">
            <Skeleton className="size-5 rounded bg-[#27272A]" />
            <Skeleton className="h-4 w-[120px] bg-[#27272A]" />
          </div>
          <Skeleton className="h-10 w-[160px] bg-[#3F3F46]" />
          <Skeleton className="h-5 w-[130px] bg-[#27272A]" />
        </div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col rounded-3xl border border-border bg-background shadow-[0_4px_12px_#00000005] p-8 gap-4"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="size-5 rounded" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
            <Skeleton className="h-10 w-[60px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="flex gap-6">
        <div className="flex-[2] rounded-3xl border border-border bg-background shadow-[0_4px_12px_#00000005] p-8">
          <Skeleton className="h-5 w-[140px] mb-1" />
          <Skeleton className="h-4 w-[260px] mb-6" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
        <div className="flex-1 rounded-3xl border border-border bg-background shadow-[0_4px_12px_#00000005] p-8">
          <Skeleton className="h-5 w-[100px] mb-1" />
          <Skeleton className="h-4 w-[160px] mb-6" />
          <Skeleton className="size-[180px] rounded-full mx-auto" />
          <div className="flex flex-col gap-3 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-2.5 rounded-full" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
