import { Schema, type } from "@colyseus/schema";
import { Coords } from "./coords";

export class Player extends Schema {
  @type('string')
  name: string;

  @type(Coords)
  coords: Coords;
}