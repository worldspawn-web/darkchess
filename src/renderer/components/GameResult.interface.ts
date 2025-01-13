export interface GameResultProps {
  result: 'win' | 'loss' | 'draw';
  gameType: 'PvP' | 'PvE';
  botName?: string;
  gameDuration: number;
  mmrGain?: number;
  onPlayAgain: () => void;
}
