import { GameObject, DataObject } from "./GameInterfaces";
import { Item } from "./Item";
import { PawnConfig } from "../config/config_types";
import { Color } from "../engine/environments";
import { Vector2D } from "../engine/math";
import { Logger } from "../utils/Logger";
import { OnlyPawn } from "../engine/preconditionners/type_cond";
import { GAME_MANAGER } from "../engine/config";
import { PrintPositions } from "../utils/BoardVisualization";
import { Tile } from "./Tile";
import { CurrentTile } from "../engine/preconditionners/get_cond";

class Pawn implements GameObject, DataObject{
    
    //Config
    log_tag?: string = "PAWN";
    hasBeenPlayed : boolean = false;
    config : PawnConfig;

    //In game data
    item? : Item;
    _health : number;
    get health() : number {
        return this._health
    }

    
 
    
    toRepr(): string {
        let item_str = this.item != undefined ? this.item?.toRepr() : ""
        return this.config.apparence.str + item_str
    }
    constructor(config : PawnConfig, public color : Color){
        this.config = config;
        this._health = config.properties.health;
    }
    toString(): string {
        return `PAWN(C:${Color[this.color]}, H:${this.health}, P:${this.hasBeenPlayed}) : ${this.item?.toString() ?? "Empty"}`
    }


    //Game Logic
    get has_item(): boolean {
        return this.item != undefined
    }
    is_walkable(incoming : GameObject): boolean {
        return false
    }
    @OnlyPawn
    is_attackable(incoming: Pawn): boolean {
        return incoming.color != this.color
    }

    can_pass_through(incoming: GameObject): boolean {
        return false
    }

    canMove(src: Vector2D, dst: Vector2D): boolean {
        if(this.hasBeenPlayed){
            Logger.error(this, "Pawn has already been played")
            return false
        }
        const possible_moves = GAME_MANAGER.tiles_manager.possibleMoves(src, this.config.properties.move.range)
        return possible_moves.find((pos) => pos.equals(dst)) != undefined
    }
    canAttack(src: Vector2D, dst: Vector2D): boolean {
        if(this.hasBeenPlayed){
            Logger.error(this, "Pawn has already been played")
            return false
        }
        const possible_attacks = GAME_MANAGER.tiles_manager.possibleAttacks(src, this.item?.config.properties.attack.range ?? this.config.properties.attack.range)
        if(possible_attacks.find((pos) => pos.equals(dst)) != undefined)
            return true
        Logger.error(this, "No possible attacks")
        return false
    }
    is_dead(): boolean {
        return this.health <= 0
    }

    //Action

    //PAWN
    equip(item : Item){
        this.item = item
    }
    get attack() : number {
        return (this.config.properties.attack.damage + (this.item?.config.properties.attack.damage ?? 0)) * (this.item?.config.properties.attack.multiplier ?? 1)
    }
    get defense() : number {
        return (this.config.properties.defense.reduce + (this.item?.config.properties.defense.reduce ?? 0)) * (this.item?.config.properties.defense.multiplier ?? 1)
    }



    //GAMEOBJECT
    processIncomingObject(object: GameObject): void {
        return
    }
    @OnlyPawn
    processIncomingAttack(incoming: Pawn): void {
        this._health -= incoming.attack - this.defense
        Logger.log(this, "Pawn has been attacked, health : " + this.health.toString())
    }

    @OnlyPawn
    processIncomingDefense(object: Pawn): void {
        if(!process.env.INFINITY_TURN)
            this.hasBeenPlayed = true
    }

    @CurrentTile
    processDeath(current? : Tile): void {
        current.object = this.item ?? null
    }

}


export { Pawn };
