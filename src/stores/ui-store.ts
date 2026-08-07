import { create } from 'zustand';

/**
 * Cross-cutting UI state that several unrelated components need to read and
 * write — the command palette is opened from the topbar button, the ⌘K
 * shortcut, the mobile nav and the sidebar, none of which are ancestors of each
 * other. Anything a single subtree owns stays in `useState`.
 */
interface UiState {
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
  toggleCommand: () => void;

  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  commandOpen: false,
  setCommandOpen: (commandOpen) => set({ commandOpen }),
  toggleCommand: () => set((state) => ({ commandOpen: !state.commandOpen })),

  mobileNavOpen: false,
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),

  sidebarCollapsed: false,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
