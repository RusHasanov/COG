export type BreathingTechnique = {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
};

export type Soundscape = {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
};

export type NavItem = 'home' | 'breathe' | 'sounds' | 'mindful' | 'library';
