import { GameObjectConfig } from "../config/config_types";
import { Color } from "../engine/environments";
import { Vector2D } from "../engine/math";
import { GameObject } from "./GameInterfaces";

export class Building implements GameObject{

    constructor(config: GameObjectConfig, color: Color){
        this.config = config
        this.color = color
    }

    //Engine
    log_tag?: string = "BUILDING";
    color: Color;
    toString(): string {
        return "BUILDING()"
    }
    config: GameObjectConfig;
    toRepr(): string {
        return this.config.apparence.str 
    }

    //Game Logic
    can_pass_through(incoming: GameObject): boolean {
        return false
    }
    is_walkable(incoming: GameObject): boolean {
        return false
    }
    canMove(src: Vector2D, dst: Vector2D): boolean {
        return false
    }
    canAttack(src: Vector2D, dst: Vector2D): boolean {
        return false
    }
    is_attackable(incoming: GameObject): boolean {
        return false    
    }

    //Action
    processIncomingObject(object: GameObject): void {
        return
    }
    processIncomingAttack(object: GameObject): void {
        return
    }
    processIncomingDefense(object: GameObject): void {
        return
    }

    
}