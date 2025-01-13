import React, { useEffect, useState } from 'react';
import './Timer.css';
import { TimerProps } from './Timer.interface';

const Timer: React.FC<TimerProps> = ({ initialTime, isRunning, onTimeEnd }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1 && onTimeEnd) {
            onTimeEnd();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, onTimeEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};

export default Timer;
