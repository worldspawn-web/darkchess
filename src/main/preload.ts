import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  getUser: (username: string) => ipcRenderer.invoke('get-user', username),
  createUser: (username: string, email: string, passwordHash: string) =>
    ipcRenderer.invoke('create-user', username, email, passwordHash),
  getBotStats: (userId: number) => ipcRenderer.invoke('get-bot-stats', userId),
  updateBotStat: (userId: number, botName: string, result: 'win' | 'loss' | 'draw') =>
    ipcRenderer.invoke('update-bot-stat', userId, botName, result),
  addPlayTime: (userId: number, minutes: number) => ipcRenderer.invoke('add-play-time', userId, minutes),
  getTotalPlayTime: (userId: number) => ipcRenderer.invoke('get-total-play-time', userId),
});
