export interface Stats {
  wins: number;
  losses: number;
  hoursPlayed: number;
}

export interface StatsPanelProps {
  gameMode: '30M' | '10M';
  onGameModeChange: (mode: '30M' | '10M') => void;
  isGameStarted: boolean;
  onGameTypeChange: (type: 'PvP' | 'PvE') => void;
  onAIDifficultyChange: (difficulty: number) => void;
  onPlayerColorChange: (color: 'white' | 'black') => void;
  onBotSelection: (bot: { name: string; mmr: number }) => void;
}
