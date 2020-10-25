import { Server } from 'colyseus';
import express from 'express';
import { createServer } from 'http';
import { GameRoom } from './game/game.room';

const port = Number(process.env.PORT || 3000);
const app = express();

const gameServer = new Server({
  server: createServer(),
  express: app,
  pingInterval: 0,
});

gameServer.define('game', GameRoom);

gameServer.listen(port);

gameServer.onShutdown(() => {
  console.log(`game server is going down.`);
});

console.log(`Listening on http://localhost:${port}`);