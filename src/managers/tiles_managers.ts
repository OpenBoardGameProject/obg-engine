import { Tile } from "../engine/tile";
import { Vector2D } from "../engine/math";
import { to_coord, to_index } from "../engine/math";
import { Board } from "../engine/board";
import { Pawn } from "../game_objects/base_objects/pawn";
import { Item } from "../game_objects/base_objects/item";
import { BoardConfig } from "../config/config_types";
import { Building } from "../game_objects/base_objects/building";
import { Color } from "../engine/environments";
import { GameManager } from "./game_manager";
import { IGameObject } from "../game_objects/interfaces";
import { PrintPositions } from "../utils/board_visualization";
export class TilesManager{
    public readonly tiles : Tile[] = [];
    private board : Board;
    private config : BoardConfig

    

    constructor(board: Board, tiles? : Tile[]){
        this.board = board;
        this.config = board.config;
        if(tiles)
            this.tiles = tiles
        else
            this.tiles = TilesManager.generate_empty_grid(this.config);

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
    private bresenhamLine(start: Vector2D, end: Vector2D): Vector2D[] {
        const line: Vector2D[] = [];
        const dx = Math.abs(end.x - start.x);
        const dy = Math.abs(end.y - start.y);
        const sx = start.x < end.x ? 1 : -1;
        const sy = start.y < end.y ? 1 : -1;
        let err = dx - dy;
      
        while (true) {
          line.push(start.clone());
      
          if (start.x === end.x && start.y === end.y) {
            break;
          }
      
          const e2 = 2 * err;
          if (e2 > -dy) {
            err -= dy;
            start.x += sx;
          }
          if (e2 < dx) {
            err += dx;
            start.y += sy;
          }
        }
      
        return line;
    }
    private is_case_visible_from(src : Vector2D, dst : Vector2D) : boolean{
        for(let pos of this.bresenhamLine(src.clone(), dst)){
            if (pos.equals(src) || pos.equals(dst))
                continue
            if(!(this.tile(pos).object?.is_transparent() ?? true))
                return false
        }  
        return true;

    }
    objects(filter : (object : IGameObject) => boolean = undefined) : IGameObject[]{
        if(filter)
            return this.tiles.filter((tile) => tile.has_object).map((tile) => tile.object).filter(filter)
        else
            return this.tiles.filter((tile) => tile.has_object).map((tile) => tile.object)
    }
    tiles_with_objects(filter : (object : IGameObject) => boolean = undefined) : Tile[]{
        if(filter)
            return this.tiles.filter((tile) => tile.has_object).filter((tile) => filter(tile.object))
        else
            return this.tiles.filter((tile) => tile.has_object)
    }


    public static generate_empty_grid(config : BoardConfig) : Tile[]{
        const tmp = []
        const size = config.properties.width * config.properties.height;
        tmp.length = size;
        for (let index = 0; index < size; index++)
        {
            tmp[index] = new Tile(to_coord(index, config.properties.width));
        }
        return tmp;
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
    public visibleTiles(src : Vector2D, range : number = 1) : Vector2D[]
    {
        const potentials = this.board.possible_moves_range(src, range)
        return potentials.filter((pos) => this.is_case_visible_from(src, pos))
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

        src_tile.object.processMove()
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