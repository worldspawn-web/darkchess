'use client';

import './ChessBoard.css';
import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.ts';
import { CSSTransition } from 'react-transition-group';
import { PIECE_SYMBOLS, type Piece } from '../types/chess';
import Timer from './Timer';
import GameResult from './GameResult';

import type { ChessBoardProps } from './ChessBoard.interface';

type Square = string;

const ChessBoard: React.FC<ChessBoardProps> = ({
  gameMode,
  onGameStart,
  onGameEnd,
  gameType,
  aiDifficulty,
  playerColor,
  selectedBot,
}) => {
  const [game, setGame] = useState(new Chess());
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);
  const [initialTime, setInitialTime] = useState(gameMode === '30M' ? 30 : 10);
  const [gameResult, setGameResult] = useState<'win' | 'loss' | 'draw' | null>(null);
  const [gameDuration, setGameDuration] = useState(0);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);

  useEffect(() => {
    setInitialTime(gameMode === '30M' ? 30 : 10);
  }, [gameMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && gameStartTime) {
      interval = setInterval(() => {
        setGameDuration(Math.floor((Date.now() - gameStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameStartTime]);

  const renderPiece = (piece: Piece | null) => {
    if (!piece) return null;

    const symbol = PIECE_SYMBOLS[piece.type];
    return <span className={`piece ${piece.color}`}>{symbol}</span>;
  };

  const handleTimeEnd = useCallback(() => {
    setIsPlaying(false);
    const result = game.turn() === playerColor[0] ? 'loss' : 'win';
    setGameResult(result);
    onGameEnd(result, gameDuration);
  }, [game, onGameEnd, playerColor, gameDuration]);

  const checkGameEnd = () => {
    if (game.inCheckmate()) {
      const result = game.turn() === playerColor[0] ? 'loss' : 'win';
      setGameResult(result);
      setIsPlaying(false);
      onGameEnd(result, gameDuration);
    } else if (game.inDraw() || game.inStalemate() || game.inThreefoldRepetition()) {
      setGameResult('draw');
      setIsPlaying(false);
      onGameEnd('draw', gameDuration);
    }
  };

  const makeAIMove = () => {
    const moves = game.moves();
    if (moves.length > 0) {
      const randomIndex = Math.floor(Math.random() * moves.length);
      game.move(moves[randomIndex]);
      setGame(new Chess(game.fen()));
      checkGameEnd();
    }
  };

  const handleSquareClick = (square: Square) => {
    if (!isPlaying) return;
    if (gameType === 'PvE' && game.turn() !== playerColor[0]) return;

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
          checkGameEnd();

          if (gameType === 'PvE' && isPlaying) {
            setTimeout(makeAIMove, 500);
          }
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
    setGameResult(null);
    setGameDuration(0);
    setGameStartTime(Date.now());
    onGameStart();

    if (gameType === 'PvE' && playerColor === 'black') {
      setTimeout(makeAIMove, 500);
    }
  };

  const handlePlayAgain = () => {
    setGameResult(null);
    handlePlayClick();
  };

  const boardSquares = [...Array(64)].map((_, i) => renderSquare(i));
  const orderedSquares = playerColor === 'white' ? boardSquares : boardSquares.reverse();

  return (
    <div className="chess-board-container">
      <div className="timer-container top">
        <Timer
          key={`opponent-${initialTime}`}
          initialTime={initialTime}
          isRunning={isPlaying && game.turn() !== playerColor[0]}
          onTimeEnd={handleTimeEnd}
        />
      </div>
      <div className={`chess-board ${!isPlaying || gameResult ? 'not-playing' : ''}`}>{orderedSquares}</div>
      <div className="timer-container bottom">
        <Timer
          key={`player-${initialTime}`}
          initialTime={initialTime}
          isRunning={isPlaying && game.turn() === playerColor[0]}
          onTimeEnd={handleTimeEnd}
        />
      </div>
      {!isPlaying && !gameResult && (
        <div className="play-overlay">
          <button className="play-button" onClick={handlePlayClick}>
            Play
          </button>
          <div className="game-mode">{gameMode}</div>
        </div>
      )}
      <CSSTransition in={gameResult !== null} timeout={300} classNames="fade" unmountOnExit>
        <div className="result-overlay">
          <GameResult
            result={gameResult!}
            gameType={gameType}
            botName={gameType === 'PvE' ? selectedBot.name : undefined}
            gameDuration={gameDuration}
            mmrGain={gameType === 'PvE' && gameResult === 'win' ? 14 : undefined}
            onPlayAgain={handlePlayAgain}
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default ChessBoard;
