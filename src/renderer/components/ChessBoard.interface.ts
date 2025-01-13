export interface ChessBoardProps {
  gameMode: '10M' | '30M';
  onGameStart: () => void;
  onGameEnd: () => void;
  gameType: 'PvP' | 'PvE';
  aiDifficulty: number;
  playerColor: 'white' | 'black';
  selectedBot: { name: string; mmr: number };
}
