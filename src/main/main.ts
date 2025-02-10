import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as db from '../renderer/utils/database';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (!app.isPackaged) {
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers
ipcMain.handle('get-user', (event, username) => {
  return db.getUser(username);
});

ipcMain.handle('create-user', (event, username, email, passwordHash) => {
  return db.createUser(username, email, passwordHash);
});

ipcMain.handle('get-bot-stats', (event, userId) => {
  return db.getBotStats(userId);
});

ipcMain.handle('update-bot-stat', (event, userId, botName, result) => {
  db.updateBotStat(userId, botName, result);
});

ipcMain.handle('add-play-time', (event, userId, minutes) => {
  db.addPlayTime(userId, minutes);
});

ipcMain.handle('get-total-play-time', (event, userId) => {
  return db.getTotalPlayTime(userId);
});
