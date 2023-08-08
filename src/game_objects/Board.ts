import { BoardConfig } from "../config/config_types";
import { Tile } from "./Tile";
import { Dir } from "../engine/environments";
import { Vector2D } from "../engine/math";
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
    private adj_matrix_move: number[][] 


    constructor(config : BoardConfig)
    {
        this.config = config;
        this.generate_adj_matrix_move();
    }
 
    
    public to_index(pos : Vector2D): number
    {
        return pos.y * this.config.properties.width + pos.x;
    }
    public to_coord(index: number): Vector2D
    {
        return new Vector2D(index % this.config.properties.width, Math.floor(index / this.config.properties.width));
    }


    private generate_adj_matrix_move(){
        const size = this.config.properties.width * this.config.properties.height;
        const height = this.config.properties.height;
        const width = this.config.properties.width;
        const out_of_bound = (index : number) => index < 0 || index >= size;

        this.adj_matrix_move = [];
        for (let index = 0; index < size; index++)
        {
            this.adj_matrix_move[index] = [];
            for (let i = 0; i < size; i++)
            {
                //Assign 8 directions to each near i 
                if (i == index + 1 && index + 1 % width != 0 && !out_of_bound(index + 1)){
                    this.adj_matrix_move[index][i] = Dir.E;
                }
                else if (i == index - 1 && index % width != 0 && !out_of_bound(index - 1)){
                    this.adj_matrix_move[index][i] = Dir.W;
                }
                else if (i == index + width && !out_of_bound(index + width)){
                    this.adj_matrix_move[index][i] = Dir.S;
                }
                else if (i == index - width && !out_of_bound(index - width)){
                    this.adj_matrix_move[index][i] = Dir.N;
                }
                else if (i == index + width + 1 && index + 1 % width != 0 && !out_of_bound(index + width + 1)){
                    this.adj_matrix_move[index][i] = Dir.SE;
                }
                else if (i == index + width - 1 && index % width != 0 && !out_of_bound(index + width - 1)){
                    this.adj_matrix_move[index][i] = Dir.SW;
                }   
                else if (i == index - width + 1 && index + 1 % width != 0 && !out_of_bound(index - width + 1)){
                    this.adj_matrix_move[index][i] = Dir.NE;
                }
                else if (i == index - width - 1 && index % width != 0 && !out_of_bound(index - width - 1)){
                    this.adj_matrix_move[index][i] = Dir.NW;
                }
                else
                    this.adj_matrix_move[index][i] = 0;                    

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
    public possible_moves_range(pos : Vector2D, range : number): Vector2D[]
    {
        function pos_move_rec(pos: Vector2D, range: number, moves: Vector2D[], board: Board){
            if (range == 0)
                return;
            const moves_pos = board.possible_moves(pos);
            moves_pos.forEach((move) => {
                if (!moves.includes(move))
                    moves.push(move);
                pos_move_rec(move, range - 1, moves, board);
            });
        }
        const moves = [];
        pos_move_rec(pos, range, moves, this);
        //Remove duplicate
        return moves.filter((move) => !move.equals(pos));
    }

    

}

export { Board };