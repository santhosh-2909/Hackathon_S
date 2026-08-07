import type { Metadata } from 'next';

import { getCurrentUser } from '@/services/workspace';
import { ProfileForm } from '@/features/settings/profile-form';

export const metadata: Metadata = {
  title: 'Profile settings',
  description: 'Name, handle and public details.',
};

export default async function SettingsProfilePage() {
  const user = await getCurrentUser();
  return <ProfileForm user={user} />;
}
