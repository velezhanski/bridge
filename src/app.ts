import express from 'express';
import { Container } from 'typedi';
import TelegramBotService from './services/telegram'

async function startServer() {
  const app = express();

  const telegramBotServiceInstance = Container.get(TelegramBotService);
  telegramBotServiceInstance.LaunchBotService(app);
}

startServer();
