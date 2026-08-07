import { Skeleton, SkeletonRegion } from '@/components/ui/skeleton';

export default function ProblemsLoading() {
  return (
    <SkeletonRegion
      label="Loading problem statements"
      className="container-page flex flex-col gap-10 py-12 md:py-16"
    >
      <div className="flex max-w-3xl flex-col gap-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-full" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-8 w-28 rounded-full" />
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-xl border border-border">
            <Skeleton className="aspect-16/9 rounded-none" />
            <div className="flex flex-col gap-3 p-5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonRegion>
  );
}
