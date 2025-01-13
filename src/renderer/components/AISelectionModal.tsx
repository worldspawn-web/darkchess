import React from 'react';
import './AISelectionModal.css';

interface AIBot {
  name: string;
  mmr: number;
  avatar: string;
  description: string;
}

interface AISelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  bots: AIBot[];
  onSelect: (bot: AIBot) => void;
  selectedBot: AIBot;
}

const AISelectionModal: React.FC<AISelectionModalProps> = ({ isOpen, onClose, bots, onSelect, selectedBot }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select AI Difficulty</h2>
        <div className="bot-list">
          {bots.map((bot) => (
            <div
              key={bot.name}
              className={`bot-item ${bot === selectedBot ? 'selected' : ''}`}
              onClick={() => onSelect(bot)}
            >
              <img src={bot.avatar} alt={bot.name} className="bot-avatar" />
              <div className="bot-info">
                <h3>{bot.name}</h3>
                <p>MMR: {bot.mmr}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AISelectionModal;
