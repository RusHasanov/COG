import { BreathingTechnique, Soundscape } from './types';

export const BREATHING_TECHNIQUES: BreathingTechnique[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Used by Navy SEALs to stay calm and focused under pressure.',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
  },
  {
    id: '478',
    name: '4-7-8 Technique',
    description: 'A natural tranquilizer for the nervous system, great for sleep.',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
  },
  {
    id: 'equal',
    name: 'Equal Breathing',
    description: 'Simple and effective for balancing energy and reducing stress.',
    inhale: 5,
    hold1: 0,
    exhale: 5,
    hold2: 0,
  },
];

export const SOUNDSCAPES: Soundscape[] = [
  {
    id: 'rain',
    name: 'Gentle Rain',
    icon: 'CloudRain',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Placeholder, using real URLs if possible or noise generators
    color: 'bg-blue-500/20',
  },
  {
    id: 'forest',
    name: 'Deep Forest',
    icon: 'Trees',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    color: 'bg-emerald-500/20',
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    icon: 'Waves',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    color: 'bg-cyan-500/20',
  },
  {
    id: 'fire',
    name: 'Crackling Fire',
    icon: 'Flame',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    color: 'bg-orange-500/20',
  },
];
