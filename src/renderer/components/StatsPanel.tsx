import React from 'react';
import './StatsPanel.css';

interface Stats {
  wins: number;
  losses: number;
  winPercentage: number;
  hoursPlayed: number;
}

const StatsPanel: React.FC = () => {
  const [mode, setMode] = React.useState<'30M' | '10M'>('30M');
  const [stats, setStats] = React.useState<Stats>({
    wins: 0,
    losses: 0,
    winPercentage: 0,
    hoursPlayed: 0,
  });

  // test data
  // later there will be real database info

  return (
    <div className="stats-panel">
      <h2>Statistics</h2>
      <div className="mode-selector">
        <button className={mode === '30M' ? 'active' : ''} onClick={() => setMode('30M')}>
          30M
        </button>
        <button className={mode === '10M' ? 'active' : ''} onClick={() => setMode('10M')}>
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
