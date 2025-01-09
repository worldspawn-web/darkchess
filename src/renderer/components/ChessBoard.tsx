import React from 'react';
import { Chess } from 'chess.ts';
import './ChessBoard.css';

const ChessBoard: React.FC = () => {
  const [game, setGame] = React.useState(new Chess());

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

  return <div className="chess-board">{[...Array(64)].map((_, i) => renderSquare(i))}</div>;
};

export default ChessBoard;
