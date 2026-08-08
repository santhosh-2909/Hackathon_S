import { PROBLEM_STATEMENTS } from '@/constants/problem-statements';
import { CommandPalette, type CommandEntry } from '@/components/layout/command-palette';

const PAGES: CommandEntry[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'problem-statement', label: 'Problem statement guide', href: '/problem-statement' },
  { id: 'problems', label: 'Problem statements', href: '/problems', hint: '10 entries' },
  { id: 'workshop', label: 'Technical workshop deck', href: '/workshop', hint: '72 slides' },
  { id: 'playbook', label: 'Playbook', href: '/playbook' },
];

/**
 * Server component that hands the palette its index at render time. Keeping the
 * data server-side means the palette ships no fetch and no loading state.
 */
function CommandPaletteMount() {
  const problems: CommandEntry[] = PROBLEM_STATEMENTS.map((problem) => ({
    id: problem.slug,
    label: problem.title,
    hint: problem.code ?? String(problem.year),
    href: `/problems/${problem.slug}`,
  }));

  return <CommandPalette problems={problems} pages={PAGES} />;
}

export { CommandPaletteMount };
