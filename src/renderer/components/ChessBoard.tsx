import React from 'react';
import { Chess } from 'chess.ts';
import './ChessBoard.css';

interface ChessBoardProps {
  gameMode?: '10M' | '30M';
}

const ChessBoard: React.FC<ChessBoardProps> = ({ gameMode = '30M' }) => {
  const [game, setGame] = React.useState(new Chess());
  const [isPlaying, setIsPlaying] = React.useState(false);

  const renderSquare = (i: number) => {
    const file = 'abcdefgh'[i % 8];
    const rank = Math.floor(i / 8) + 1;
    const piece = game.get(`${file}${rank}`);
    const squareColor = (Math.floor(i / 8) + (i % 8)) % 2 === 0 ? 'light' : 'dark';

    return (
      <div key={i} className={`square ${squareColor}`}>
        {piece ? piece.type : ''}
        {i % 8 === 7 && <div className="rank-label">{rank}</div>}
        {Math.floor(i / 8) === 7 && <div className="file-label">{file}</div>}
      </div>
    );
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="chess-board-container">
      <div className={`chess-board ${!isPlaying ? 'not-playing' : ''}`}>
        {[...Array(64)].map((_, i) => renderSquare(i))}
      </div>
      {!isPlaying && (
        <div className="play-overlay">
          <button className="play-button" onClick={handlePlayClick}>
            Play
          </button>
          <div className="game-mode">{gameMode}</div>
        </div>
      )}
    </div>
  );
};

export default ChessBoard;
