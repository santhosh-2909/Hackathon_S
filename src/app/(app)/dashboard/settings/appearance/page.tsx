import type { Metadata } from 'next';

import { AppearanceForm } from '@/features/settings/appearance-form';

export const metadata: Metadata = {
  title: 'Appearance settings',
  description: 'Theme and motion preferences.',
};

export default function AppearanceSettingsPage() {
  return <AppearanceForm />;
}
