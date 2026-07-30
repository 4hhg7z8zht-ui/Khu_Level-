'tsx'
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Stats, Quest, Item, Achievement } from '../types/game';

interface GameContextType {
  profile: UserProfile;
  stats: Stats;
  quests: Quest[];
  inventory: Item[];
  achievements: Achievement[];
  completeQuest: (id: string) => void;
  allocateStatPoint: (statKey: keyof Stats) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Sung Jin-Woo',
    level: 12,
    currentXP: 1450,
    nextLevelXP: 2000,
    rank: 'C',
    gold: 3400,
    crystals: 45,
    keys: 3,
    streak: 7,
    completedQuestsCount: 142,
    trainingTimeMinutes: 380,
    freeStatPoints: 5,
    title: 'Охотник',
  });

  const [stats, setStats] = useState<Stats>({
    strength: 45,
    agility: 38,
    stamina: 40,
    intelligence: 50,
    concentration: 42,
    speed: 35,
    health: 60,
    discipline: 55,
    motivation: 48,
    luck: 20,
    selfControl: 45,
    financialIQ: 30,
    knowledge: 55,
    charisma: 40,
  });

  const [quests, setQuests] = useState<Quest[]>([
    { id: '1', title: '50 отжиманий', category: 'strength', xpReward: 150, goldReward: 30, completed: false, isDaily: true },
    { id: '2', title: 'Медитация 15 минут', category: 'selfControl', xpReward: 100, goldReward: 20, completed: false, isDaily: true },
    { id: '3', title: 'Кодить 1 час', category: 'intelligence', xpReward: 200, goldReward: 50, completed: false, isDaily: true },
  ]);

  const [inventory, setInventory] = useState<Item[]>([
    { id: 'i1', name: 'Кинжал Касака', type: 'artifact', rarity: 'Epic', description: 'Оружие, дающее +5 к скорости.', icon: '🗡️', unlocked: true },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'a1', title: 'Первая кровь', description: 'Выполнить первый квест', progress: 1, maxProgress: 1, completed: true, rewardXP: 100 },
    { id: 'a2', title: 'Железная воля', description: 'Серия 7 дней подряд', progress: 7, maxProgress: 7, completed: true, rewardXP: 500 },
  ]);

  const completeQuest = (id: string) => {
    setQuests(prev => prev.map(q => {
      if (q.id === id && !q.completed) {
        // Начисляем XP и золото
        setProfile(p => {
          let newXP = p.currentXP + q.xpReward;
          let newLevel = p.level;
          let nextXP = p.nextLevelXP;
          let freePoints = p.freeStatPoints;

          if (newXP >= nextXP) {
            newLevel += 1;
            newXP -= nextXP;
            nextXP = Math.round(nextXP * 1.25);
            freePoints += 5; // +5 свободных очков при левелапе
          }

          return {
            ...p,
            currentXP: newXP,
            level: newLevel,
            nextLevelXP: nextXP,
            gold: p.gold + q.goldReward,
            completedQuestsCount: p.completedQuestsCount + 1,
            freeStatPoints: freePoints
          };
        });

        // Увеличиваем соответствующую характеристику
        setStats(s => ({
          ...s,
          [q.category]: s[q.category] + 2
        }));

        return { ...q, completed: true };
      }
      return q;
    }));
  };

  const allocateStatPoint = (statKey: keyof Stats) => {
    if (profile.freeStatPoints > 0) {
      setProfile(p => ({ ...p, freeStatPoints: p.freeStatPoints - 1 }));
      setStats(s => ({ ...s, [statKey]: s[statKey] + 1 }));
    }
  };

  return (
    <GameContext.Provider value={{ profile, stats, quests, inventory, achievements, completeQuest, allocateStatPoint, activeTab, setActiveTab }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
