import { GameState } from "./game.state";
import { Coords } from "./schemas/coords";

export class MapController {
  state: GameState;

  constructor(state: GameState) {
    this.state = state;
  }

  randomEmptyCoords(): Coords | null {
    let coords: Coords = null;
    let tries = 0;
    do {
      coords = Coords.random(this.state.mapColumnCount, this.state.mapRowCount);
      for (const [,value] of this.state.players) {
        if (coords.isEqual(value.coords)) {
          coords = null;
          break;
        }
      }
    } while (coords === null && tries < 1000)
    return coords;
  }

  isCoordsInMap(coords: Coords): boolean {
    return coords.x >= 0 && coords.y >= 0 && coords.x < this.state.mapColumnCount && coords.y < this.state.mapRowCount;
  }
}