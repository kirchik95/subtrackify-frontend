import { Skeleton } from '@/components/ui/skeleton';

export const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Page header skeleton */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-[18px] w-[320px]" />
        </div>
        <div className="flex items-center gap-8 border-b border-border">
          <Skeleton className="h-5 w-12 mb-3" />
          <Skeleton className="h-5 w-20 mb-3" />
          <Skeleton className="h-5 w-12 mb-3" />
        </div>
      </div>

      {/* Row 1: Avatar card + Personal info card */}
      <div className="flex gap-6">
        <div className="flex w-[420px] shrink-0 flex-col items-center gap-6 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
          <Skeleton className="size-24 rounded-full" />
          <div className="flex flex-col items-center gap-1">
            <Skeleton className="h-[22px] w-[120px]" />
            <Skeleton className="h-[18px] w-[160px]" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-[42px] w-[112px] rounded-xl" />
            <Skeleton className="h-[42px] w-[88px] rounded-xl" />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-7 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
          <Skeleton className="h-[22px] w-[180px]" />
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-[18px] w-[80px]" />
              <Skeleton className="h-[44px] w-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-[18px] w-[80px]" />
              <Skeleton className="h-[44px] w-full rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-[18px] w-[100px]" />
              <Skeleton className="h-[44px] w-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-[18px] w-[40px]" />
              <Skeleton className="h-[44px] w-full rounded-xl" />
            </div>
          </div>
          <div className="flex justify-end border-t border-border pt-5">
            <Skeleton className="h-[38px] w-[120px] rounded-xl" />
          </div>
        </div>
      </div>

      {/* Row 2: Change password card + Danger zone card */}
      <div className="flex gap-6">
        <div className="flex flex-[2] basis-0 flex-col gap-7 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
          <Skeleton className="h-[22px] w-[160px]" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[18px] w-[120px]" />
            <Skeleton className="h-[44px] w-full rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-[18px] w-[100px]" />
              <Skeleton className="h-[44px] w-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-[18px] w-[130px]" />
              <Skeleton className="h-[44px] w-full rounded-xl" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 basis-0 flex-col gap-4 rounded-3xl border border-border bg-white p-8 shadow-[0_4px_12px_#00000005]">
          <Skeleton className="h-[22px] w-[120px]" />
          <Skeleton className="h-[18px] w-full" />
          <Skeleton className="h-[18px] w-[80%]" />
          <Skeleton className="mt-auto h-[38px] w-[135px] rounded-xl" />
        </div>
      </div>
    </div>
  );
};
