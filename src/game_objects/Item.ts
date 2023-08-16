import { ItemConfig } from "../config/config_types";
import { Color } from "../engine/environments";
import { Vector2D } from "../engine/math";
import { OnlyPawn } from "../engine/preconditionners/type_cond";
import { GameObject, DataObject } from "./GameInterfaces";
import { Pawn } from "./Pawn";

class Item implements GameObject, DataObject{
    config : ItemConfig;
    log_tag?: string = "ITEM";

    constructor(config : ItemConfig, public color : Color){
        this.config = config
    }
    toString(): string {
        return `ITEM()`
    }

    //Game Logic
    can_pass_through(incoming: GameObject): boolean {
        return true
    }

    toRepr(): string {
        return this.config.apparence.str
    }

    canMove(): boolean {
        return false
    }
    canAttack(src: Vector2D, dst: Vector2D): boolean {
        return false
    }

    @OnlyPawn
    is_walkable(incoming : Pawn): boolean {
        return !(incoming as Pawn).has_item
    }

    is_attackable(incoming: GameObject): boolean {
        return false
    }

    //Action
    @OnlyPawn
    processIncomingObject(object: Pawn): void {
        object.equip(this)
    }

    processIncomingAttack(object: GameObject): void {
        return
    }
    processIncomingDefense(object: GameObject): void {
        return
    }


}


export { Item };