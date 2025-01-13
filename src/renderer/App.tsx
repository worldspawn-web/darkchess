import './App.css';
import React, { useState } from 'react';
import ChessBoard from './components/ChessBoard';
import StatsPanel from './components/StatsPanel';

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<'30M' | '10M'>('30M');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameType, setGameType] = useState<'PvP' | 'PvE'>('PvP');
  const [aiDifficulty, setAiDifficulty] = useState(1);
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white');
  const [selectedBot, setSelectedBot] = useState({ name: 'Timur', mmr: 1000 });

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

  const handleGameEnd = () => {
    setIsGameStarted(false);
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
