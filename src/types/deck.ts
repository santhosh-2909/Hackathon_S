export interface DeckSlide {
  /** 1-based position, used in the URL hash and the slide counter. */
  number: number;
  /** Short label for the rail and the PowerPoint slide title placeholder. */
  label: string;
  title: string;
  /** One line stating what this slide has to prove. */
  purpose: string;
  /** Bullets a team fills in. Square brackets mark a slot to replace. */
  bullets: string[];
  /** Worked example from the workshop content, shown as a filled-in reference. */
  example?: string;
  /** The single mistake that kills this slide. */
  pitfall: string;
  /** Rough time to spend presenting it, in seconds. */
  seconds: number;
}

export interface DeckMeta {
  title: string;
  subtitle: string;
  /** Total pitch length the seven slides are budgeted against. */
  totalSeconds: number;
}
