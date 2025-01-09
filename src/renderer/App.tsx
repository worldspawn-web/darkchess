import React, { useState } from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';
import StatsPanel from './components/StatsPanel';

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<'30M' | '10M'>('30M');
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleGameModeChange = (mode: '30M' | '10M') => {
    if (!isGameStarted) {
      setGameMode(mode);
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
      <StatsPanel gameMode={gameMode} onGameModeChange={handleGameModeChange} isGameStarted={isGameStarted} />
      <ChessBoard gameMode={gameMode} onGameStart={handleGameStart} onGameEnd={handleGameEnd} />
    </div>
  );
};

export default App;
