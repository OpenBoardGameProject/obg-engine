import { BoardConfig } from "../config/config_types";
import { Vector2D } from "./math";
/**
 * Board class
 *
 * @class Board
 *
 * @property {BoardConfig} config
 * @description Deals with the board geometry
 *
 */
declare class Board {
    config: BoardConfig;
    private readonly backup_matrix;
    private current_adj_matrix_move;
    get adj_matrix_move(): number[][];
    constructor(config: BoardConfig);
    to_index(pos: Vector2D): number;
    to_coord(index: number): Vector2D;
    cut_relations(cut_array: number[][]): void;
    cut_relation(pos: Vector2D): void;
    restore_relations(pos: Vector2D): void;
    private generate_adj_matrix_move;
    possible_moves(pos: Vector2D): Vector2D[];
    possible_moves_range(pos: Vector2D, range?: number): Vector2D[];
}
export { Board };
