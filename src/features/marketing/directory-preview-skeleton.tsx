import { Skeleton, SkeletonRegion } from '@/components/ui/skeleton';

function DirectoryPreviewSkeleton() {
  return (
    <SkeletonRegion label="Loading problem statements" className="section-y">
      <div className="container-page">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-full max-w-lg" />
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <li key={index}>
              <div className="overflow-hidden rounded-xl border border-border">
                <Skeleton className="aspect-16/9 rounded-none" />
                <div className="flex flex-col gap-3 p-5">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SkeletonRegion>
  );
}

export { DirectoryPreviewSkeleton };
