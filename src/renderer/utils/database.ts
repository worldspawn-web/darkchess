import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'darkchess.db');
const db = new Database(dbPath, { verbose: console.log });

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

export function getUser(username: string): User | null {
  const stmt = db.prepare('SELECT id, username, email FROM users WHERE username = ?');
  return stmt.get(username) as User | null;
}

export function createUser(username: string, email: string, passwordHash: string): number {
  const stmt = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
  const result = stmt.run(username, email, passwordHash);
  return result.lastInsertRowid as number;
}

export function getBotStats(userId: number): BotStat[] {
  const stmt = db.prepare('SELECT bot_name, wins, losses, draws FROM bot_stats WHERE user_id = ?');
  return stmt.all(userId) as BotStat[];
}

export function updateBotStat(userId: number, botName: string, result: 'win' | 'loss' | 'draw'): void {
  const stmt = db.prepare(`
    INSERT INTO bot_stats (user_id, bot_name, wins, losses, draws)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(user_id, bot_name) DO UPDATE SET
    wins = wins + CASE WHEN ? = 'win' THEN 1 ELSE 0 END,
    losses = losses + CASE WHEN ? = 'loss' THEN 1 ELSE 0 END,
    draws = draws + CASE WHEN ? = 'draw' THEN 1 ELSE 0 END
  `);
  stmt.run(
    userId,
    botName,
    result === 'win' ? 1 : 0,
    result === 'loss' ? 1 : 0,
    result === 'draw' ? 1 : 0,
    result,
    result,
    result
  );
}

export function addPlayTime(userId: number, minutes: number): void {
  const today = new Date().toISOString().split('T')[0];
  const stmt = db.prepare(`
    INSERT INTO play_time (user_id, date, minutes_played)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id, date) DO UPDATE SET
    minutes_played = minutes_played + ?
  `);
  stmt.run(userId, today, minutes, minutes);
}

export function getTotalPlayTime(userId: number): number {
  const stmt = db.prepare('SELECT SUM(minutes_played) as total FROM play_time WHERE user_id = ?');
  const result = stmt.get(userId) as { total: number } | null;
  return result ? result.total : 0;
}
