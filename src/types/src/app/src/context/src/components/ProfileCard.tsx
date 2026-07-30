'tsx'
'use client';

import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';

export const ProfileCard: React.FC = () => {
  const { profile } = useGame();
  const xpPercentage = (profile.currentXP / profile.nextLevelXP) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-2xl p-6 glow-blue cyber-border relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-600 to-black p-1 glow-blue">
            <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center text-3xl">
              ⚡
            </div>
          </div>
          <span className="absolute -bottom-2 -right-2 bg-blue-600 text-xs px-2 py-0.5 rounded-full font-bold border border-blue-400">
            {profile.rank}
          </span>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {profile.name}
              </h1>
              <p className="text-sm text-blue-300/80 uppercase tracking-widest">{profile.title} • Уровень {profile.level}</p>
            </div>
            <div className="flex items-center justify-center gap-4 bg-black/40 px-4 py-2 rounded-xl border border-blue-500/20">
              <span className="text-yellow-400 font-bold">🪙 {profile.gold}</span>
              <span className="text-cyan-400 font-bold">💎 {profile.crystals}</span>
              <span className="text-purple-400 font-bold">🔑 {profile.keys}</span>
            </div>
          </div>

          {/* XP Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1 font-mono text-blue-300">
              <span>XP: {profile.currentXP} / {profile.nextLevelXP}</span>
              <span>{Math.round(xpPercentage)}%</span>
            </div>
            <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden p-0.5 border border-blue-500/30">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full glow-blue"
                style={{ width: `${xpPercentage}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${xpPercentage}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Быстрая статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-500/20 text-center">
        <div className="bg-black/30 p-3 rounded-xl border border-blue-500/10">
          <div className="text-xs text-blue-400">Streak</div>
          <div className="text-xl font-bold text-white mt-1">🔥 {profile.streak} дней</div>
        </div>
        <div className="bg-black/30 p-3 rounded-xl border border-blue-500/10">
          <div className="text-xs text-blue-400">Квесты</div>
          <div className="text-xl font-bold text-white mt-1">⚔️ {profile.completedQuestsCount}</div>
        </div>
        <div className="bg-black/30 p-3 rounded-xl border border-blue-500/10">
          <div className="text-xs text-blue-400">Тренировки</div>
          <div className="text-xl font-bold text-white mt-1">⏱️ {profile.trainingTimeMinutes} мин</div>
        </div>
        <div className="bg-black/30 p-3 rounded-xl border border-blue-500/10">
          <div className="text-xs text-blue-400">Свободные очки</div>
          <div className="text-xl font-bold text-cyan-400 mt-1">✨ +{profile.freeStatPoints}</div>
        </div>
      </div>
    </motion.div>
  );
};
