import { Command } from "@colyseus/command";
import { GameState } from "../game.state";
import { MapController } from "../map.controller";
import { Coords } from "../schemas/coords";

interface Payload {
  sessionId: string;
  x: number;
  y: number;
}

export class MovePlayerCommand extends Command<GameState, Payload> {
  mapCtr = new MapController(this.state);
  
  validate({sessionId, x, y}: Payload): boolean {
    const player = this.state.players.get(sessionId);

    if (!player) {
      return false;
    }

    const to = new Coords({x, y});

    return this.mapCtr.isCoordsInMap(to) && player.coords.idAdjacent(to);
  }

  execute({sessionId, x, y}: Payload): void {
    const player = this.state.players.get(sessionId);
    player.coords = new Coords({x, y});
  }
}