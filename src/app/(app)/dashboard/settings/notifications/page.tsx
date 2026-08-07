import type { Metadata } from 'next';

import { NotificationsForm } from '@/features/settings/notifications-form';

export const metadata: Metadata = {
  title: 'Notification settings',
  description: 'Choose what the workspace emails you about.',
};

export default function NotificationSettingsPage() {
  return <NotificationsForm />;
}
