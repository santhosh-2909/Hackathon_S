import {
  BookOpen,
  FileText,
  LayoutDashboard,
  Library,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

/**
 * Anchors + routes in the marketing header. Labels are nouns, not phrases —
 * "The problem" reads as prose in a nav rail and costs a line wrap for nothing.
 *
 * "Problem statements" points at the directory, not at the how-to guide: the
 * statements themselves are what people come for, and a separate "Directory"
 * entry beside it was two names for one idea. The guide is reachable from the
 * top of that page and from the landing section.
 */
export const MARKETING_NAV: NavItem[] = [
  { href: '/problems', label: 'Problem statements' },
  { href: '/project-journey', label: 'Project Journey' },
  { href: '/#the-stack', label: 'Stack' },
  { href: '/workshop', label: 'Workshop' },
  { href: '/deck', label: 'Deck' },
  { href: '/playbook', label: 'Playbook' },
];

export const APP_NAV: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: LayoutDashboard,
    description: 'Validation progress at a glance',
  },
  {
    href: '/dashboard/library',
    label: 'Library',
    icon: Library,
    description: 'Problem statements your team is tracking',
  },
  {
    href: '/dashboard/team',
    label: 'Team',
    icon: Users,
    description: 'Members, roles and invitations',
  },
  {
    href: '/dashboard/submissions',
    label: 'Submissions',
    icon: FileText,
    description: 'Drafts and review status',
  },
];

export const APP_SECONDARY_NAV: NavItem[] = [
  { href: '/playbook', label: 'Playbook', icon: BookOpen },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export const SETTINGS_NAV: NavItem[] = [
  { href: '/dashboard/settings', label: 'Profile', description: 'Name, handle and public details' },
  {
    href: '/dashboard/settings/account',
    label: 'Account',
    description: 'Email, password and sessions',
  },
  {
    href: '/dashboard/settings/appearance',
    label: 'Appearance',
    description: 'Theme and density',
  },
  {
    href: '/dashboard/settings/notifications',
    label: 'Notifications',
    description: 'What we email you about',
  },
];

export const FOOTER_NAV: { title: string; items: NavItem[] }[] = [
  {
    title: 'Method',
    items: [
      { href: '/problem-statement', label: 'Writing a statement' },
      { href: '/#the-approach', label: 'Approach' },
      { href: '/#the-stack', label: 'Stack' },
    ],
  },
  {
    title: 'Problem statements',
    items: [
      { href: '/problems', label: 'All statements' },
      { href: '/problems?domain=healthcare', label: 'Healthcare' },
      { href: '/problems?domain=aiml', label: 'AI / ML' },
      { href: '/problems?domain=cybersecurity', label: 'Cybersecurity' },
      { href: '/deck', label: 'Pitch deck template' },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/playbook', label: 'Playbook' },
      { href: '/workshop', label: 'Workshop deck' },
    ],
  },
];
