import './ChessBoard.css';
import React from 'react';
import { Chess } from 'chess.ts';
import { PIECE_SYMBOLS, Piece } from '../types/chess';

interface ChessBoardProps {
  gameMode: '10M' | '30M';
}

const ChessBoard: React.FC<ChessBoardProps> = ({ gameMode }) => {
  const [game, setGame] = React.useState(new Chess());
  const [isPlaying, setIsPlaying] = React.useState(false);

  const renderPiece = (piece: Piece | null) => {
    if (!piece) return null;

    const symbol = PIECE_SYMBOLS[piece.type];
    return <span className={`piece ${piece.color}`}>{symbol}</span>;
  };

  const renderSquare = (i: number) => {
    const file = 'abcdefgh'[i % 8];
    const rank = Math.floor(i / 8) + 1;
    const piece = game.get(`${file}${rank}`);
    const squareColor = (Math.floor(i / 8) + (i % 8)) % 2 === 0 ? 'light' : 'dark';

    return (
      <div key={i} className={`square ${squareColor}`}>
        {renderPiece(piece)}
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
