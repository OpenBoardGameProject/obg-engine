import { BoardConfig } from "../config/config_types";
import { Tile } from "./Tile";

import { TestPawn } from "./Pawn";
class Board
{
    private tiles: Tile[][];


    constructor(config : BoardConfig)
    {
        this.tiles = [];
        for (let i = 0; i < config.properties.width; i++)
        {
            this.tiles[i] = [];
            for (let j = 0; j < config.properties.height; j++)
            {
                this.tiles[i][j] = new Tile(i, j);
            }
        }

        this.tiles[1][2] = new Tile(1, 2, new TestPawn());
    }

    public toString(): string {
        let result = "";
        for (let i = 0; i < 8; i++)
        {
            result += "\n";
            for (let j = 0; j < 8; j++)
            {
                result += this.tiles[i][j].toString();
            }
        }
        return result;
    }


    

}

export { Board };