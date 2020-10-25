import { Dispatcher } from "@colyseus/command";
import { Client, Room } from "colyseus";
import { MovePlayerCommand } from "./commands/move-player.command";
import { OnJoinCommand } from "./commands/on-join.command";
import { OnLeaveCommand } from "./commands/on-leave.command";
import { GameMessage } from "./game-message";
import { GameState } from "./game.state";

export class GameRoom extends Room<GameState> {
  dispatcher = new Dispatcher(this);
  
  onCreate() {
    this.setState(new GameState());

    this.onMessage(GameMessage.MOVE, (client: Client, {x, y}: {x: number, y: number}) => {
      this.dispatcher.dispatch(new MovePlayerCommand(), {sessionId: client.sessionId, x, y});
    });
  }

  async onJoin(client: Client) {
    this.dispatcher.dispatch(new OnJoinCommand(), {sessionId: client.sessionId});
  }

  onLeave(client: Client) {
    this.dispatcher.dispatch(new OnLeaveCommand(), {sessionId: client.sessionId});
  }

  onDispose() {
    this.dispatcher.stop();
  }
}