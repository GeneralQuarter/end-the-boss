import { Schema, type } from "@colyseus/schema";
import { randomInt } from "crypto";

export class Coords extends Schema {
  @type('int32')
  x: number;

  @type('int32')
  y: number;

  /**
   * 
   * @param maxX max on x (exclusive)
   * @param maxY max on y (exclusive)
   */
  static random(maxX: number, maxY: number): Coords {
    return new Coords({x: randomInt(maxX), y: randomInt(maxY)});
  }

  static clone(coords: Coords): Coords {
    const {x, y} = coords;
    return new Coords({x, y});
  }

  isEqual(other: Coords): boolean {
    if (!other) {
      return false;
    }
    
    return other.x === this.x && other.y === this.y;
  }

  idAdjacent(to: Coords): boolean {
    if (!to || this.isEqual(to)) {
      return false;
    }

    const distX = Math.abs(to.x - this.x);
    const distY = Math.abs(to.y - this.y);
    
    return distX < 2 && distY < 2;
  }
}