import { Tile } from "../engine/tile";
import { Vector2D } from "../engine/math";
import { to_coord, to_index } from "../engine/math";
import { Board } from "../engine/board";
import { Pawn } from "../game_objects/base_objects/Pawn";
import { Item } from "../game_objects/base_objects/Item";
import { BoardConfig } from "../config/config_types";
import { Building } from "../game_objects/base_objects/Building";
import { Color } from "../engine/environments";
import { GameManager } from "./GameManager";
import { GameObject } from "../game_objects/GameInterfaces";
import { PrintPositions } from "../utils/BoardVisualization";
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

    objects(filter : (object : GameObject) => boolean = undefined) : GameObject[]{
        if(filter)
            return this.tiles.filter((tile) => tile.has_object).map((tile) => tile.object).filter(filter)
        else
            return this.tiles.filter((tile) => tile.has_object).map((tile) => tile.object)
    }
    tiles_with_objects(filter : (object : GameObject) => boolean = undefined) : Tile[]{
        if(filter)
            return this.tiles.filter((tile) => tile.has_object).filter((tile) => filter(tile.object))
        else
            return this.tiles.filter((tile) => tile.has_object)
    }


    private generate_tiles(){
        const size = this.config.properties.width * this.config.properties.height;
        for (let index = 0; index < size; index++)
        {
            this.tiles[index] = new Tile(this.to_coord(index));
        }
    }


    public possibleMoves(src: Vector2D, range: number = 1, filter: (Vector2D) => boolean = undefined): Vector2D[]
    {
        if(range == 0)
            return []
        const moves = this.board.possible_moves(src)
        const moves_filtered = !filter ? moves.filter((move) => this.tile(move).object?.can_pass_through(undefined) ?? true) : moves.filter(filter)
        const moves_filtered_unique = moves_filtered.filter((move) => !move.equals(src))
        const moves_rec = moves_filtered_unique.flatMap((move) => this.possibleMoves(move, range - 1, filter))
        return [...moves_filtered_unique, ...moves_rec]
    }
    public possibleAttacks(src: Vector2D, range: number = 1): Vector2D[]
    {   
        return this.possibleMoves(src, range, (pos) => true).filter((move) => this.tile(move).has_object && this.tile(move).object?.is_attackable(this.tile(src).object??undefined))
    }

    public canMove(src: Vector2D, dst: Vector2D): boolean {
        return this.tile(src).canMove(dst) && this.tile(dst).canWalkOn(this.tile(src).object ?? undefined)
    }

    public canAttack(src: Vector2D, dst: Vector2D): boolean {
        return this.tile(src).canAttack(dst)
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
    public attack(src : Vector2D, dst : Vector2D) : boolean{
        if(!this.canAttack(src, dst))
            return false
        
        const src_tile = this.tile(src)
        const dst_tile = this.tile(dst)

        dst_tile.object?.processIncomingAttack(src_tile.object)
        src_tile.object?.processIncomingDefense(dst_tile.object)

        if(dst_tile.object?.is_dead()){
            dst_tile.object?.processDeath()
        }

        if(src_tile.object?.is_dead()){
            src_tile.object?.processDeath()
        }

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