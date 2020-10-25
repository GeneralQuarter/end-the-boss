import { Command } from "@colyseus/command";
import { GameState } from "../game.state";

interface Payload {
  sessionId: string;
}

export class OnLeaveCommand extends Command<GameState, Payload> {
  execute(payload: Payload): void {
    this.state.players.delete(payload.sessionId);
  }
}