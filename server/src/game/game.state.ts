import { MapSchema, Schema, type } from "@colyseus/schema";
import { Player } from "./schemas/player";

export class GameState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  @type('int32')
  mapColumnCount = 10;

  @type('int32')
  mapRowCount = 10;
}