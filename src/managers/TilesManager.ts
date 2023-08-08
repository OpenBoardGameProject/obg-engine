import { Tile } from "../game_objects/Tile";
import { BoardConfig } from "../config/config_types";
import { Vector2D } from "../engine/math";
import { to_coord, to_index } from "../engine/math";
import { Pawn } from "../game_objects/Pawn";
export class TilesManager{
    public readonly tiles : Tile[] = [];

    constructor(public config: BoardConfig){
        this.generate_tiles();


    }
    public tile(pos : Vector2D): Tile{
        if(!pos)
            throw new Error("pos is undefined")
        const index = this.to_index(pos)
        return this.tiles[index]
    }
    public tileByIndex(index : number) : Tile{
        return this.tiles[index]
    }
    private to_index(pos : Vector2D): number
    {
        console.log(pos)
        return to_index(pos, this.config.properties.width);
    }
    private to_coord(index: number): Vector2D{
        return to_coord(index, this.config.properties.width);
    }


    private generate_tiles(){
        const size = this.config.properties.width * this.config.properties.height;
        for (let index = 0; index < size; index++)
        {
            this.tiles[index] = new Tile(this.to_coord(index));
        }
    }

    public dev_addpawn(pawn : Pawn, pos : Vector2D){
        let index = this.to_index(pos)
        this.tiles[index].object = pawn
    }
}