import React from 'react';
import './StatsPanel.css';

interface Stats {
  wins: number;
  losses: number;
  winPercentage: number;
  hoursPlayed: number;
}

interface StatsPanelProps {
  gameMode: '30M' | '10M';
  onGameModeChange: (mode: '30M' | '10M') => void;
  isGameStarted: boolean;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ gameMode, onGameModeChange, isGameStarted }) => {
  const [stats, setStats] = React.useState<Stats>({
    wins: 0,
    losses: 0,
    winPercentage: 0,
    hoursPlayed: 0,
  });

  return (
    <div className="stats-panel">
      <h2>Statistics</h2>
      <div className="mode-selector">
        <button
          className={gameMode === '30M' ? 'active' : ''}
          onClick={() => onGameModeChange('30M')}
          disabled={isGameStarted}
        >
          30M
        </button>
        <button
          className={gameMode === '10M' ? 'active' : ''}
          onClick={() => onGameModeChange('10M')}
          disabled={isGameStarted}
        >
          10M
        </button>
      </div>
      <div className="stats">
        <p>Wins: {stats.wins}</p>
        <p>Losses: {stats.losses}</p>
        <p>Win %: {stats.winPercentage.toFixed(2)}%</p>
        <p>Hours played: {stats.hoursPlayed.toFixed(2)}</p>
      </div>
      <div className="user-info">
        <div className="avatar"></div>
        <p className="nickname">Worldspawn</p>
      </div>
    </div>
  );
};

export default StatsPanel;
