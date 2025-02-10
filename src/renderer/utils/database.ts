export interface User {
  id: number;
  username: string;
  email: string;
}

export interface BotStat {
  botName: string;
  wins: number;
  losses: number;
  draws: number;
}

export async function getUser(username: string): Promise<User | null> {
  return (window as any).electron.getUser(username);
}

export async function createUser(username: string, email: string, passwordHash: string): Promise<number> {
  return (window as any).electron.createUser(username, email, passwordHash);
}

export async function getBotStats(userId: number): Promise<BotStat[]> {
  return (window as any).electron.getBotStats(userId);
}

export async function updateBotStat(userId: number, botName: string, result: 'win' | 'loss' | 'draw'): Promise<void> {
  return (window as any).electron.updateBotStat(userId, botName, result);
}

export async function addPlayTime(userId: number, minutes: number): Promise<void> {
  return (window as any).electron.addPlayTime(userId, minutes);
}

export async function getTotalPlayTime(userId: number): Promise<number> {
  return (window as any).electron.getTotalPlayTime(userId);
}
