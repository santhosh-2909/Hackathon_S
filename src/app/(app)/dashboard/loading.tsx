import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton, SkeletonRegion } from '@/components/ui/skeleton';

/**
 * Segment loading UI. Next swaps this in automatically while the server
 * component tree for `/dashboard` resolves — the layout shell stays mounted.
 */
export default function DashboardLoading() {
  return (
    <SkeletonRegion label="Loading dashboard" className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col gap-3 p-5">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {[0, 1].map((index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-5 w-44" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-56 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </SkeletonRegion>
  );
}
