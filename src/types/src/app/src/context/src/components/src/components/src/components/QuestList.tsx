'tsx'
'use client';

import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';

export const QuestList: React.FC = () => {
  const { quests, completeQuest } = useGame();

  return (
    <div className="glass-panel rounded-2xl p-6 glow-blue">
      <h2 className="text-xl font-bold text-cyan-400 tracking-wider mb-6">ЕЖЕДНЕВНЫЕ КВЕСТЫ</h2>
      
      <div className="space-y-4">
        {quests.map((quest) => (
          <motion.div
            key={quest.id}
            whileHover={{ scale: 1.01 }}
            className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
              quest.completed ? 'bg-green-950/20 border-green-500/30 opacity-70' : 'bg-black/40 border-blue-500/30'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{quest.completed ? '✅' : '⚔️'}</span>
                <h3 className={`font-semibold text-lg ${quest.completed ? 'line-through text-green-300' : 'text-white'}`}>
                  {quest.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                <span className="text-blue-400">+{quest.xpReward} XP</span>
                <span className="text-yellow-400">+{quest.goldReward} Золота</span>
              </div>
            </div>

            <button
              disabled={quest.completed}
              onClick={() => completeQuest(quest.id)}
              className={`px-6 py-2 rounded-xl font-bold transition-all ${
                quest.completed 
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white glow-blue'
              }`}
            >
              {quest.completed ? 'ВЫПОЛНЕНО' : 'ЗАВЕРШИТЬ'}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
