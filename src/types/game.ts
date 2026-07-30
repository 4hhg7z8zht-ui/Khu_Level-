export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS' | 'Monarch';
export type ItemRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';

export interface Stats {
  strength: number;
  agility: number;
  stamina: number;
  intelligence: number;
  concentration: number;
  speed: number;
  health: number;
  discipline: number;
  motivation: number;
  luck: number;
  selfControl: number;
  financialIQ: number;
  knowledge: number;
  charisma: number;
}

export interface UserProfile {
  name: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  rank: Rank;
  gold: number;
  crystals: number;
  keys: number;
  streak: number;
  completedQuestsCount: number;
  trainingTimeMinutes: number;
  freeStatPoints: number;
  title: string;
}

export interface Quest {
  id: string;
  title: string;
  category: keyof Stats;
  xpReward: number;
  goldReward: number;
  completed: boolean;
  isDaily: boolean;
}

export interface Item {
  id: string;
  name: string;
  type: 'artifact' | 'collectible' | 'theme' | 'avatar' | 'frame';
  rarity: ItemRarity;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  rewardXP: number;
}
