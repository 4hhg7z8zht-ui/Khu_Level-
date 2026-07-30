'tsx'
'use client';

import React from 'react';
import { useGame } from '../context/GameContext';
import { Stats } from '../types/game';

const statLabels: Record<keyof Stats, { name: string; icon: string }> = {
  strength: { name: 'Сила', icon: '💪' },
  agility: { name: 'Ловкость', icon: '🏃' },
  stamina: { name: 'Выносливость', icon: '🛡️' },
  intelligence: { name: 'Интеллект', icon: '🧠' },
  concentration: { name: 'Концентрация', icon: '🎯' },
  speed: { name: 'Скорость', icon: '⚡' },
  health: { name: 'Здоровье', icon: '❤️' },
  discipline: { name: 'Дисциплина', icon: '😤' },
  motivation: { name: 'Мотивация', icon: '🔥' },
  luck: { name: 'Удача', icon: '🍀' },
  selfControl: { name: 'Самоконтроль', icon: '🧘' },
  financialIQ: { name: 'Финансовый интеллект', icon: '💰' },
  knowledge: { name: 'Знания', icon: '📚' },
  charisma: { name: 'Харизма', icon: '🎤' },
};

export const StatsPanel: React.FC = () => {
  const { stats, profile, allocateStatPoint } = useGame();

  return (
    <div className="glass-panel rounded-2xl p-6 glow-blue">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-cyan-400 tracking-wider">ХАРАКТЕРИСТИКИ ПЕРСОНАЖА</h2>
        {profile.freeStatPoints > 0 && (
          <span className="text-xs bg-cyan-500/20 border border-cyan-400 text-cyan-300 px-3 py-1 rounded-full animate-pulse">
            Доступно очков: {profile.freeStatPoints}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(stats) as Array<keyof Stats>).map((key) => {
          const stat = statLabels[key];
          return (
            <div key={key} className="bg-black/40 p-4 rounded-xl border border-blue-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <div className="text-sm font-medium text-blue-200">{stat.name}</div>
                  <div className="text-lg font-bold text-cyan-400 font-mono">{stats[key]}</div>
                </div>
              </div>
              {profile.freeStatPoints > 0 && (
                <button
                  onClick={() => allocateStatPoint(key)}
                  className="bg-blue-600 hover:bg-blue-500 text-white w-8 h-8 rounded-lg font-bold transition-all glow-blue flex items-center justify-center"
                >
                  +
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
