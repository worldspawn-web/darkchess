import './ChessBoard.css';
import React, { useState } from 'react';
import { Chess } from 'chess.ts';
import { PIECE_SYMBOLS, Piece } from '../types/chess';

interface ChessBoardProps {
  gameMode: '10M' | '30M';
}

type Square = string;

const ChessBoard: React.FC<ChessBoardProps> = ({ gameMode }) => {
  const [game, setGame] = useState(new Chess());
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);

  const renderPiece = (piece: Piece | null) => {
    if (!piece) return null;

    const symbol = PIECE_SYMBOLS[piece.type];
    return <span className={`piece ${piece.color}`}>{symbol}</span>;
  };

  const handleSquareClick = (square: Square) => {
    if (!isPlaying) return;

    if (selectedSquare === null) {
      const piece = game.get(square);
      if (piece && piece.color === (game.turn() === 'w' ? 'w' : 'b')) {
        setSelectedSquare(square);
        setPossibleMoves(game.moves({ square, verbose: true }).map((move) => move.to));
      }
    } else {
      if (square === selectedSquare) {
        setSelectedSquare(null);
        setPossibleMoves([]);
      } else {
        const move = game.move({ from: selectedSquare, to: square, promotion: 'q' });
        if (move) {
          setGame(new Chess(game.fen()));
          setSelectedSquare(null);
          setPossibleMoves([]);
        } else if (game.get(square) && game.get(square)?.color === game.get(selectedSquare)?.color) {
          setSelectedSquare(square);
          setPossibleMoves(game.moves({ square, verbose: true }).map((move) => move.to));
        }
      }
    }
  };

  const renderSquare = (i: number) => {
    const file = 'abcdefgh'[i % 8];
    const rank = 8 - Math.floor(i / 8);
    const square = `${file}${rank}` as Square;
    const piece = game.get(square);
    const squareColor = (Math.floor(i / 8) + (i % 8)) % 2 === 0 ? 'light' : 'dark';
    const isSelected = square === selectedSquare;
    const isPossibleMove = possibleMoves.includes(square);

    return (
      <div
        key={i}
        className={`square ${squareColor} ${isSelected ? 'selected' : ''} ${isPossibleMove ? 'possible-move' : ''}`}
        onClick={() => handleSquareClick(square)}
      >
        {renderPiece(piece)}
        {i % 8 === 7 && <div className="rank-label">{rank}</div>}
        {Math.floor(i / 8) === 7 && <div className="file-label">{file}</div>}
      </div>
    );
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
    setGame(new Chess());
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
