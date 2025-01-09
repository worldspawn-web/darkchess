import React from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';
import StatsPanel from './components/StatsPanel';

const App: React.FC = () => {
  const [gameMode, setGameMode] = React.useState<'30M' | '10M'>('30M');

  const handleGameModeChange = (mode: '30M' | '10M') => {
    setGameMode(mode);
  };

  return (
    <div className="app">
      <StatsPanel gameMode={gameMode} onGameModeChange={handleGameModeChange} />
      <ChessBoard gameMode={gameMode} />
    </div>
  );
};

export default App;
