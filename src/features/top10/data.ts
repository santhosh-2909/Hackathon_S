export interface FinalistTeam {
  rank: number;
  name: string;
  topic: string;
  monogram: string;
}

export const FINALIST_TEAMS: FinalistTeam[] = [
  {
    rank: 1,
    name: 'A Clear',
    topic: 'An AI-Powered Smart Waste Transformation System',
    monogram: 'AC',
  },
  {
    rank: 2,
    name: 'Rescue Bite',
    topic: 'AI-driven real time food rescue network',
    monogram: 'RB',
  },
  {
    rank: 3,
    name: 'Byte Me',
    topic: 'An AI Powered Public Project Intelligence',
    monogram: 'BM',
  },
  {
    rank: 4,
    name: 'Crisis CRUSHERS',
    topic: 'App-based crop and plant disease identification',
    monogram: 'CC',
  },
  {
    rank: 5,
    name: 'Alpha Squad',
    topic: 'Small business ops agent',
    monogram: 'AS',
  },
  {
    rank: 6,
    name: 'Jarvis Unit',
    topic: 'LifeFlow Finder',
    monogram: 'JU',
  },
  {
    rank: 7,
    name: 'Quadrix',
    topic: 'AI-Powered Unified Citizen Service & Opportunity Platform',
    monogram: 'QX',
  },
  {
    rank: 8,
    name: 'Squad Crew',
    topic: 'Topic to be confirmed',
    monogram: 'SC',
  },
  {
    rank: 9,
    name: 'Tech Orbit',
    topic: 'AI urban flood prediction and evacuation system',
    monogram: 'TO',
  },
  {
    rank: 10,
    name: 'StarkX',
    topic: 'PrepFresherAI — AI-powered career & Interview coach',
    monogram: 'SX',
  },
];

export const leftTeamColumn = FINALIST_TEAMS.slice(0, 5);
export const rightTeamColumn = FINALIST_TEAMS.slice(5);
