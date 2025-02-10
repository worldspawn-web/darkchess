'use client';

import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import StatsPanel from './components/StatsPanel';
import {
  getUser,
  createUser,
  getBotStats,
  updateBotStat,
  addPlayTime,
  getTotalPlayTime,
  type User,
  type BotStat,
} from './utils/database';
import ChessBoard from './components/ChessBoard';

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<'30M' | '10M'>('30M');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameType, setGameType] = useState<'PvP' | 'PvE'>('PvP');
  const [aiDifficulty, setAiDifficulty] = useState(1);
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white');
  const [selectedBot, setSelectedBot] = useState({ name: 'Timur', mmr: 1000 });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [botStats, setBotStats] = useState<BotStat[]>([]);
  const [totalPlayTime, setTotalPlayTime] = useState(0);

  useEffect(() => {
    // Здесь должна быть логика аутентификации
    const username = 'testuser'; // Заглушка, замените на реальную аутентификацию
    let user = getUser(username);
    if (!user) {
      const userId = createUser(username, 'test@example.com', 'password_hash');
      user = { id: userId, username, email: 'test@example.com' };
    }
    setCurrentUser(user);

    if (user) {
      setBotStats(getBotStats(user.id));
      setTotalPlayTime(getTotalPlayTime(user.id));
    }
  }, []);

  const handleGameModeChange = (mode: '30M' | '10M') => {
    if (!isGameStarted) {
      setGameMode(mode);
    }
  };

  const handleGameTypeChange = (type: 'PvP' | 'PvE') => {
    if (!isGameStarted) {
      setGameType(type);
    }
  };

  const handleAIDifficultyChange = (difficulty: number) => {
    if (!isGameStarted) {
      setAiDifficulty(difficulty);
    }
  };

  const handlePlayerColorChange = (color: 'white' | 'black') => {
    if (!isGameStarted) {
      setPlayerColor(color);
    }
  };

  const handleBotSelection = (bot: { name: string; mmr: number }) => {
    if (!isGameStarted) {
      setSelectedBot(bot);
    }
  };

  const handleGameStart = () => {
    setIsGameStarted(true);
  };

  const handleGameEnd = (result: 'win' | 'loss' | 'draw', duration: number) => {
    setIsGameStarted(false);
    if (currentUser && gameType === 'PvE') {
      updateBotStat(currentUser.id, selectedBot.name, result);
      addPlayTime(currentUser.id, Math.floor(duration / 60));
      setBotStats(getBotStats(currentUser.id));
      setTotalPlayTime(getTotalPlayTime(currentUser.id));
    }
  };

  return (
    <div className="app">
      <StatsPanel
        gameMode={gameMode}
        onGameModeChange={handleGameModeChange}
        isGameStarted={isGameStarted}
        onGameTypeChange={handleGameTypeChange}
        onAIDifficultyChange={handleAIDifficultyChange}
        onPlayerColorChange={handlePlayerColorChange}
        onBotSelection={handleBotSelection}
        botStats={botStats}
        totalPlayTime={totalPlayTime}
      />
      <ChessBoard
        gameMode={gameMode}
        onGameStart={handleGameStart}
        onGameEnd={handleGameEnd}
        gameType={gameType}
        aiDifficulty={aiDifficulty}
        playerColor={playerColor}
        selectedBot={selectedBot}
      />
    </div>
  );
};

export default App;
