export interface AIBot {
  name: string;
  mmr: number;
  avatar: string;
  description: string;
}

export interface AISelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  bots: AIBot[];
  onSelect: (bot: AIBot) => void;
  selectedBot: AIBot;
}
