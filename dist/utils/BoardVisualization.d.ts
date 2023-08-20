import { Board } from "../engine/board";
import { Vector2D } from "../engine/math";
import { Tile } from "../engine/tile";
declare function PrintPositions(board: Board, pos: Vector2D[], render?: (pos: Vector2D, is_pos: boolean) => string): void;
declare function PrintBoard(tiles: Tile[], board: Board): void;
export { PrintPositions, PrintBoard };
