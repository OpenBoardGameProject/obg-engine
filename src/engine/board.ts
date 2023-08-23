import { BoardConfig } from "../config/config_types";
import { to_coord, to_index } from "./math";
import { Dir } from "./environments";
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
class Board
{
    public config : BoardConfig;
    private __adj_matrix_move: number[][]

    get adj_matrix_move(): number[][] {
        return this.__adj_matrix_move;
    }

    

    constructor(config : BoardConfig)
    {
        this.config = config;

        this.__adj_matrix_move = [];
        this.generate_adj_matrix_move();
        //Copy the matrix
    }
 
    
    public to_index(pos : Vector2D): number
    {
        return to_index(pos, this.config.properties.width)
    }
    public to_coord(index: number): Vector2D
    {
        return to_coord(index, this.config.properties.width)
    }

    private generate_adj_matrix_move() {
        const size = this.config.properties.width * this.config.properties.height;
        const height = this.config.properties.height;
        const width = this.config.properties.width;
        const out_of_bound = (index: number) => index < 0 || index >= size;
    
        for (let index = 0; index < size; index++) {
            this.adj_matrix_move[index] = [];
            const row = Math.floor(index / width);
            const col = index % width;
    
            for (let i = 0; i < size; i++) {
                const row_i = Math.floor(i / width);
                const col_i = i % width;
    
                if (
                    (Math.abs(row - row_i) <= 1) &&
                    (Math.abs(col - col_i) <= 1) &&
                    (row !== row_i || col !== col_i) &&
                    !out_of_bound(i)
                ) {
                    // Calculate direction based on the difference in rows and columns
                    const dir_row = row_i - row;
                    const dir_col = col_i - col;
    
                    let direction: Dir;
    
                    if (dir_row === -1) {
                        if (dir_col === -1) direction = Dir.NW;
                        else if (dir_col === 0) direction = Dir.N;
                        else direction = Dir.NE;
                    } else if (dir_row === 0) {
                        if (dir_col === -1) direction = Dir.W;
                        else if (dir_col === 0) direction = 0;
                        else direction = Dir.E;
                    } else {
                        if (dir_col === -1) direction = Dir.SW;
                        else if (dir_col === 0) direction = Dir.S;
                        else direction = Dir.SE;
                    }
    
                    this.adj_matrix_move[index][i] = direction;
                } else {
                    this.adj_matrix_move[index][i] = 0;
                }
            }
        }
    }
    
    



    public possible_moves(pos : Vector2D): Vector2D[]
    {
        const index = this.to_index(pos);
        return this.adj_matrix_move[index].map((dir, i) => {
            if (dir != 0)
                return this.to_coord(i);
            return null;
        }).filter((pos) => pos != null);
    }

    public possible_moves_range(pos : Vector2D, range : number = 1): Vector2D[]
    {
        if(range == 0)
            return []
        const moves = this.possible_moves(pos)
        const moves_filtered_unique = moves.filter((move) => !move.equals(pos))
        const moves_rec = moves_filtered_unique.flatMap((move) => this.possible_moves_range(move, range - 1))
        const returned = [...moves_filtered_unique, ...moves_rec]
        return returned
    }

    

}

export { Board };