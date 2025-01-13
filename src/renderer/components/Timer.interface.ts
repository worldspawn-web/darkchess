export interface TimerProps {
  initialTime: number; // in minutes
  isRunning: boolean;
  onTimeEnd?: () => void;
}
