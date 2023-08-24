import { GameObjectConfig } from "../config/config_types";
import { Color } from "../engine/environments";
import { Vector2D } from "../engine/math";
import { Tile } from "../engine/tile";
import { GameManager } from "../managers/GameManager";
import { IGameObject } from "./interfaces";

export class GameObject implements IGameObject{
    color: Color;
    log_tag?: string = "GAMEOBJECT";
    context: GameManager;
    config: GameObjectConfig;

    constructor(config: GameObjectConfig, color: Color, context : GameManager){
        this.context = context
        this.config = config
        this.color = color
        
    }

    //INTERNAL
    toString(): string {
        return "GAMEOBJECT()"
    }
    
    toRepr(): string {
        return this.config.apparence.str
    }

    //Game Logic
    can_pass_through(incoming: IGameObject): boolean {
        return this.config.properties.can_pass_through
    }
    is_walkable(incoming: IGameObject): boolean {
        return this.config.properties.is_walkable
    }
    canMove(src: Vector2D, dst: Vector2D): boolean {
        return this.config.properties.can_move
    }
    canAttack(src: Vector2D, dst: Vector2D): boolean {
        return this.config.properties.can_attack
    }
    is_attackable(incoming: IGameObject): boolean {
        return this.config.properties.is_attackable
    }
    is_dead(tile?: Tile): boolean {
        return false
    }
    is_transparent() : boolean{
        return this.config.properties.is_transparent
    }

    //Action
    processIncomingObject(object: IGameObject): void {}
    processMove(): void {}
    processIncomingAttack(object: IGameObject): void {}
    processIncomingDefense(object: IGameObject): void {}
    processDeath(): void {}
    processNewTurn(): void {}
    

}