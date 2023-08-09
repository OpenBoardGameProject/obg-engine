import { GameObjectConfig } from "../config/config_types";
import { Color } from "../engine/environments";
import { Vector2D } from "../engine/math";
import { GameObject } from "./GameInterfaces";

export class Building implements GameObject{

    constructor(config: GameObjectConfig, color: Color){
        this.config = config
        this.color = color
    }


    color: Color;
    toString(): string {
        return "BUILDING()"
    }
    config: GameObjectConfig;
    toRepr(): string {
        return this.config.apparence.str 
    }
    can_pass_through(incoming: GameObject): boolean {
        return false
    }
    is_walkable(incoming: GameObject): boolean {
        return false
    }
    canMove(src: Vector2D, dst: Vector2D): boolean {
        return false
    }
    processIncomingObject(object: GameObject): void {
        return
    }
    log_tag?: string = "BUILDING";
    
}