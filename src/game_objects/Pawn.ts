import { GameObject, DataObject } from "./GameInterfaces";
import { Item } from "./Item";
import { PawnConfig } from "../config/config_types";
import { Color } from "../engine/environments";
import { Vector2D } from "../engine/math";
import { Logger } from "../utils/Logger";
import { GAME_MANAGER } from "../engine/config";

class Pawn implements GameObject, DataObject{
    
    //Config
    log_tag?: string = "PAWN";
    hasBeenPlayed : boolean = false;
    config : PawnConfig;

    //In game data
    item? : Item;


    
 
    
    toRepr(): string {
        let item_str = this.item != undefined ? this.item?.toRepr() : ""
        return this.config.apparence.str + item_str
    }
    constructor(config : PawnConfig, public color : Color){
        this.config = config;
    }
    toString(): string {
        return `PAWN() : ${this.item?.toString() ?? "Empty"}`
    }

    get has_item(): boolean {
        return this.item != undefined
    }

    
    equip(item : Item){
        this.item = item
    }

    is_walkable(incoming : GameObject): boolean {
        return false
    }

    can_pass_through(incoming: GameObject): boolean {
        return false
    }

    processIncomingObject(object: GameObject): void {
        
    }



    canMove(src: Vector2D, dst: Vector2D): boolean {
        if(this.hasBeenPlayed){
            Logger.error(this, "Pawn has already been played")
            return false
        }
        const possible_moves = GAME_MANAGER.tiles_manager.possible_moves(src, this.config.properties.move.range)
        return possible_moves.find((pos) => pos.equals(dst)) != undefined
    }



}


export { Pawn };
