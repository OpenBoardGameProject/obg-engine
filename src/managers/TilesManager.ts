import { Tile } from "../game_objects/Tile";
import { Vector2D } from "../engine/math";
import { to_coord, to_index } from "../engine/math";
import { Board } from "../engine/board";
import { Pawn } from "../game_objects/Pawn";
import { Item } from "../game_objects/Item";
import { BoardConfig } from "../config/config_types";
import { Building } from "../game_objects/Building";
export class TilesManager{
    public readonly tiles : Tile[] = [];
    private board : Board;
    private config : BoardConfig

    constructor(board: Board){
        this.board = board;
        this.config = board.config;
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
    // public possible_moves_range(pos : Vector2D, range : number): Vector2D[]
    // {
    //     function pos_move_rec(pos: Vector2D, range: number, moves: Vector2D[], board: Board){
    //         if (range == 0)
    //             return;
    //         const moves_pos = board.possible_moves(pos);
    //         moves_pos.forEach((move) => {
    //             if (!moves.includes(move))
    //                 moves.push(move);
    //             pos_move_rec(move, range - 1, moves, board);
    //         });
    //     }
    //     const moves = [];
    //     pos_move_rec(pos, range, moves, this);
    //     //Remove duplicate
    //     return moves.filter((move) => !move.equals(pos));
    // }


    public possible_moves(src: Vector2D, range: number = 1): Vector2D[]
    {
        if(range == 0)
            return []
        const moves = this.board.possible_moves(src)
        const moves_filtered = moves.filter((move) => this.tile(move).object?.can_pass_through(undefined) ?? true)
        const moves_filtered_unique = moves_filtered.filter((move) => !move.equals(src))

        const moves_rec = moves_filtered_unique.flatMap((move) => this.possible_moves(move, range - 1))
        return [...moves_filtered_unique, ...moves_rec]
    }

    public canMove(src: Vector2D, dst: Vector2D): boolean {
        return this.tile(src).canMove(dst) && this.tile(dst).canWalkOn(this.tile(src).object ?? undefined)
    }
    public move(src: Vector2D, dst: Vector2D): boolean {
        if (!this.canMove(src, dst))
            return false

        const src_tile = this.tile(src)
        const dst_tile = this.tile(dst)

        dst_tile.object?.processIncomingObject(src_tile.object)

        dst_tile.object = src_tile.object
        src_tile.object = undefined

        return true
    }




    public dev_addpawn(pawn : Pawn, pos : Vector2D){
        let index = this.to_index(pos)
        this.tiles[index].object = pawn
    }
    public dev_additem(item : Item, pos : Vector2D){
        let index = this.to_index(pos)
        this.tiles[index].object = item
    }
    public dev_addbuilding(building : Building, pos : Vector2D){
        let index = this.to_index(pos)
        this.tiles[index].object = building
    }
}