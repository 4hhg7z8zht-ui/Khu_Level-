'tsx'
'use client';

import React from 'react';
import { GameProvider, useGame } from '../context/GameContext';
import { ProfileCard } from '../components/ProfileCard';
import { StatsPanel } from '../components/StatsPanel';
import { QuestList } from '../components/QuestList';

function Dashboard() {
  const { activeTab, setActiveTab } = useGame();

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Навигация */}
      <nav className="flex justify-center gap-2 md:gap-4 glass-panel p-2 rounded-2xl glow-blue overflow-x-auto">
        {['profile', 'stats', 'quests', 'inventory', 'shop', 'achievements'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-blue-600 text-white glow-blue border border-blue-400'
                : 'text-blue-300/70 hover:text-white hover:bg-blue-950/40'
            }`}
          >
            {tab === 'profile' && '🏠 Главная'}
            {tab === 'stats' && '📊 Характеристики'}
            {tab === 'quests' && '⚔️ Квесты'}
            {tab === 'inventory' && '🎒 Инвентарь'}
            {tab === 'shop' && '🛒 Магазин'}
            {tab === 'achievements' && '🏆 Достижения'}
          </button>
        ))}
      </nav>

      {/* Контент вкладок */}
      <div className="space-y-8">
        <ProfileCard />
        
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StatsPanel />
            <QuestList />
          </div>
        )}

        {activeTab === 'stats' && <StatsPanel />}
        {activeTab === 'quests' && <QuestList />}
        {activeTab === 'inventory' && (
          <div className="glass-panel p-6 rounded-2xl text-center text-blue-300">
            Инвентарь и артефакты в разработке...
          </div>
        )}
        {activeTab === 'shop' && (
          <div className="glass-panel p-6 rounded-2xl text-center text-blue-300">
            Магазин тем и наград в разработке...
          </div>
        )}
        {activeTab === 'achievements' && (
          <div className="glass-panel p-6 rounded-2xl text-center text-blue-300">
            Система достижений в разработке...
          </div>
        )}
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <GameProvider>
      <Dashboard />
    </GameProvider>
  );
}
