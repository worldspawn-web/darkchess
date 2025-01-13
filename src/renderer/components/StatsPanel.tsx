import './StatsPanel.css';
import React, { useState } from 'react';
import { MoreVertical, ChevronDown, ChevronUp } from 'lucide-react';

interface Stats {
  wins: number;
  losses: number;
  hoursPlayed: number;
}

interface StatsPanelProps {
  gameMode: '30M' | '10M';
  onGameModeChange: (mode: '30M' | '10M') => void;
  isGameStarted: boolean;
  onGameTypeChange: (type: 'PvP' | 'PvE') => void;
  onAIDifficultyChange: (difficulty: number) => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  gameMode,
  onGameModeChange,
  isGameStarted,
  onGameTypeChange,
  onAIDifficultyChange,
}) => {
  const [stats, setStats] = React.useState<Stats>({
    wins: 3,
    losses: 1,
    hoursPlayed: 14,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gameType, setGameType] = useState<'PvP' | 'PvE'>('PvP');
  const [aiDifficulty, setAiDifficulty] = useState(1);
  const [isAISettingsOpen, setIsAISettingsOpen] = useState(false);

  const winPercentage = stats.wins + stats.losses === 0 ? 0 : (stats.wins / (stats.wins + stats.losses)) * 100;

  const handleGameTypeChange = (type: 'PvP' | 'PvE') => {
    setGameType(type);
    onGameTypeChange(type);
  };

  const handleAIDifficultyChange = (difficulty: number) => {
    setAiDifficulty(difficulty);
    onAIDifficultyChange(difficulty);
  };

  return (
    <div className="stats-panel">
      <h2 className="panel-title">Dark Chess</h2>

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

      <div className="game-type-selector">
        <button
          className={gameType === 'PvP' ? 'active' : ''}
          onClick={() => handleGameTypeChange('PvP')}
          disabled={isGameStarted}
        >
          PvP
        </button>
        <button
          className={gameType === 'PvE' ? 'active' : ''}
          onClick={() => handleGameTypeChange('PvE')}
          disabled={isGameStarted}
        >
          PvE
        </button>
      </div>

      {gameType === 'PvE' && (
        <div className="ai-settings">
          <button className="ai-settings-toggle" onClick={() => setIsAISettingsOpen(!isAISettingsOpen)}>
            AI Difficulty {isAISettingsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {isAISettingsOpen && (
            <div className="ai-difficulty-selector">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  className={aiDifficulty === level ? 'active' : ''}
                  onClick={() => handleAIDifficultyChange(level)}
                  disabled={isGameStarted}
                >
                  {level}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="stats-container">
        <div className="stats-text">
          <span className="wins">{stats.wins}W</span>
          {' : '}
          <span className="losses">{stats.losses}L</span>
          <span className="percentage">({winPercentage.toFixed(0)}%)</span>
        </div>

        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${winPercentage}%` }} />
        </div>
      </div>

      <div className="user-info">
        <div className="separator" />
        <div className="profile">
          <div className="avatar"></div>
          <div className="user-details">
            <div className="nickname-container">
              <p className="nickname">Worldspawn</p>
              <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MoreVertical size={16} />
              </button>
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => console.log('Change account')}>Change account</button>
                </div>
              )}
            </div>
            <p className="hours-played">{stats.hoursPlayed}h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
