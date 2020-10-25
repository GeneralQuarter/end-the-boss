import { Command } from "@colyseus/command";
import { GameState } from "../game.state";
import { Player } from "../schemas/player";
import { PlacePlayerCommand } from "./place-player.command";

interface Payload {
  sessionId: string;
}

export class OnJoinCommand extends Command<GameState, Payload> {
  execute({sessionId}: Payload): Command[] {
    this.state.players.set(sessionId, new Player());
    
    return [
      new PlacePlayerCommand().setPayload({sessionId})
    ];
  }
}