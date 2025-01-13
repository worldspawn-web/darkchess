import './StatsPanel.css';
import React, { useState } from 'react';
import { MoreVertical, ChevronDown, ChevronUp } from 'lucide-react';
import AISelectionModal from './AISelectionModal';

interface Stats {
  wins: number;
  losses: number;
  hoursPlayed: number;
}

interface AIBot {
  name: string;
  mmr: number;
  avatar: string;
  description: string;
}

interface StatsPanelProps {
  gameMode: '30M' | '10M';
  onGameModeChange: (mode: '30M' | '10M') => void;
  isGameStarted: boolean;
  onGameTypeChange: (type: 'PvP' | 'PvE') => void;
  onAIDifficultyChange: (difficulty: number) => void;
}

// will refactor
const BOTS: AIBot[] = [
  {
    name: 'Timur',
    mmr: 1000,
    avatar: '/placeholder.svg?height=50&width=50',
    description: 'Начинающий бот с базовыми навыками игры в шахматы.',
  },
  {
    name: 'Alex',
    mmr: 1500,
    avatar: '/placeholder.svg?height=50&width=50',
    description: 'Бот среднего уровня с хорошим пониманием тактики.',
  },
  {
    name: 'Maria',
    mmr: 2000,
    avatar: '/placeholder.svg?height=50&width=50',
    description: 'Продвинутый бот с сильной стратегической игрой.',
  },
  {
    name: 'Garry',
    mmr: 2500,
    avatar: '/placeholder.svg?height=50&width=50',
    description: 'Эксперт-уровень, способный конкурировать с сильными игроками.',
  },
  {
    name: 'Deep Blue',
    mmr: 3000,
    avatar: '/placeholder.svg?height=50&width=50',
    description: 'Легендарный бот, практически непобедимый.',
  },
];

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
  const [selectedBot, setSelectedBot] = useState<AIBot>(BOTS[0]);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const winPercentage = stats.wins + stats.losses === 0 ? 0 : (stats.wins / (stats.wins + stats.losses)) * 100;

  const handleGameTypeChange = (type: 'PvP' | 'PvE') => {
    setGameType(type);
    onGameTypeChange(type);
  };

  const handleAISelection = (bot: AIBot) => {
    setSelectedBot(bot);
    onAIDifficultyChange(BOTS.indexOf(bot) + 1);
    setIsAIModalOpen(false);
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
          <button className="ai-settings-toggle" onClick={() => setIsAIModalOpen(true)} disabled={isGameStarted}>
            AI Difficulty
          </button>
          <div className="ai-info">
            <img src={selectedBot.avatar} alt={selectedBot.name} className="ai-avatar" />
            <div className="ai-details">
              <h3>{selectedBot.name}</h3>
              <p>MMR: {selectedBot.mmr}</p>
              <p>{selectedBot.description}</p>
            </div>
          </div>
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

      <AISelectionModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        bots={BOTS}
        onSelect={handleAISelection}
        selectedBot={selectedBot}
      />
    </div>
  );
};

export default StatsPanel;
