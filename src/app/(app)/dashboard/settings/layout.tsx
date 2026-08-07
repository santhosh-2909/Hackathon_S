import { PageHeader } from '@/components/common/page-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SettingsNav } from '@/features/settings/settings-nav';

/**
 * Nested layout: the header and the section nav persist across every settings
 * child route, so switching tabs re-renders only the panel.
 */
export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Workspace and account preferences. Changes apply immediately."
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Overview</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
        <SettingsNav />
        <div className="max-w-2xl min-w-0">{children}</div>
      </div>
    </>
  );
}
