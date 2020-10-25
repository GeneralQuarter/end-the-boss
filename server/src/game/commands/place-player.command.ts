import { Command } from "@colyseus/command";
import { GameState } from "../game.state";
import { MapController } from "../map.controller";

interface Payload {
  sessionId: string;
}

export class PlacePlayerCommand extends Command<GameState, Payload> {
  mapCtr = new MapController(this.state);

  validate({sessionId}: Payload): boolean {
    return this.state.players.has(sessionId);
  }

  execute(payload: Payload): void {
    const player = this.state.players.get(payload.sessionId);
    player.coords = this.mapCtr.randomEmptyCoords();
  }
}