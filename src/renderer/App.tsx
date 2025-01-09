import React from 'react';
import './App.css';
import ChessBoard from './components/ChessBoard';
import StatsPanel from './components/StatsPanel';

const App: React.FC = () => {
  return (
    <div className="app">
      <StatsPanel />
      <ChessBoard />
    </div>
  );
};

export default App;
