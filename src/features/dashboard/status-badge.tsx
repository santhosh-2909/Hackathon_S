import { CircleCheck, CircleDashed, CircleDot, CircleSlash, Hammer } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import type { SubmissionStage, TrackStatus } from '@/types/workspace';

/**
 * Status pills. Every state carries an icon and a word — colour is the third
 * channel, never the only one.
 */
const TRACK: Record<
  TrackStatus,
  { label: string; variant: React.ComponentProps<typeof Badge>['variant']; icon: typeof CircleDot }
> = {
  exploring: { label: 'Exploring', variant: 'neutral', icon: CircleDashed },
  validating: { label: 'Validating', variant: 'info', icon: CircleDot },
  building: { label: 'Building', variant: 'accent', icon: Hammer },
  shipped: { label: 'Shipped', variant: 'success', icon: CircleCheck },
  dropped: { label: 'Dropped', variant: 'neutral', icon: CircleSlash },
};

const STAGE: Record<
  SubmissionStage,
  { label: string; variant: React.ComponentProps<typeof Badge>['variant']; icon: typeof CircleDot }
> = {
  draft: { label: 'Draft', variant: 'neutral', icon: CircleDashed },
  'in-review': { label: 'In review', variant: 'warning', icon: CircleDot },
  accepted: { label: 'Accepted', variant: 'success', icon: CircleCheck },
  rejected: { label: 'Rejected', variant: 'danger', icon: CircleSlash },
};

function TrackStatusBadge({ status }: { status: TrackStatus }) {
  const config = TRACK[status];
  const Icon = config.icon;
  return (
    <Badge variant={config.variant} size="sm">
      <Icon aria-hidden />
      {config.label}
    </Badge>
  );
}

function SubmissionStageBadge({ stage }: { stage: SubmissionStage }) {
  const config = STAGE[stage];
  const Icon = config.icon;
  return (
    <Badge variant={config.variant} size="sm">
      <Icon aria-hidden />
      {config.label}
    </Badge>
  );
}

export { TrackStatusBadge, SubmissionStageBadge };
