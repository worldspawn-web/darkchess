import './GameResult.css';
import React from 'react';
import { GameResultProps } from './GameResult.interface';

const GameResult: React.FC<GameResultProps> = ({ result, gameType, botName, gameDuration, mmrGain, onPlayAgain }) => {
  const resultText = result === 'win' ? 'Victory!' : result === 'loss' ? 'Defeat' : 'Draw';
  const resultClass = result === 'win' ? 'win' : result === 'loss' ? 'loss' : 'draw';

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`game-result ${resultClass}`}>
      <h2>{resultText}</h2>
      {gameType === 'PvE' && botName && <p className="bot-stats">vs {botName}</p>}
      <p className="game-duration">Game duration: {formatDuration(gameDuration)}</p>
      {gameType === 'PvE' && mmrGain !== undefined && <p className="mmr-gain">MMR gained: +{mmrGain}</p>}
      <button className="play-again-btn" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default GameResult;
