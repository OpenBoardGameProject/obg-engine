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
    private readonly backup_matrix: number[][] 
    private current_adj_matrix_move: number[][]

    get adj_matrix_move(): number[][] {
        return this.current_adj_matrix_move;
    }

    

    constructor(config : BoardConfig)
    {
        this.config = config;

        this.current_adj_matrix_move = [];
        this.generate_adj_matrix_move();
        //Copy the matrix
        this.backup_matrix = Object.assign([], this.adj_matrix_move)
    }
 
    
    public to_index(pos : Vector2D): number
    {
        return to_index(pos, this.config.properties.width)
    }
    public to_coord(index: number): Vector2D
    {
        return to_coord(index, this.config.properties.width)
    }

    public cut_relations(cut_array : number[][]){
        //Check if it's the size of the board
        if (cut_array.length != this.config.properties.width && cut_array[0].length != this.config.properties.height){
            throw new Error("Cut array is not the size of the board");
        }
        cut_array.forEach((row, x) => {
            row.forEach((value, y) => {
                if(value == 0){
                    this.restore_relations(new Vector2D(x, y));
                }else
                {
                    this.cut_relation(new Vector2D(x, y));
                }
            });
        });
    }

    public cut_relation(pos : Vector2D){
        const index = this.to_index(pos);
        const size = this.config.properties.width * this.config.properties.height;

        // Set all the column items at 0 (x=x , y=[0, height])
        for (let i = 0; i < size; i++) {
            this.adj_matrix_move[i][index] = 0;
        }
    }
    public restore_relations(pos : Vector2D){
        const index = this.to_index(pos);
        const size = this.config.properties.width * this.config.properties.height;

        // Set all the column items at 0 (x=x , y=[0, height])
        for (let i = 0; i < size; i++) {
            this.adj_matrix_move[i][index] = this.backup_matrix[i][index];
        }
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

    

}

export { Board };