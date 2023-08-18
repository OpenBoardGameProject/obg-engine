import { ItemConfig } from "../../config/config_types";
import { Color } from "../../engine/environments";
import { Vector2D } from "../../engine/math";
import { OnlyPawn } from "../../engine/preconditionners/type_cond";
import { IGameObject, DataObject } from "../GameInterfaces";
import { GameObject } from "../GameObject";
import { Pawn } from "./Pawn";

class Item extends GameObject implements DataObject{
    config : ItemConfig;
    log_tag?: string = "ITEM";

    constructor(config : ItemConfig, public color : Color){
        super(config, color)
    }
    toString(): string {
        return `ITEM()`
    }

    //Game Logic

    @OnlyPawn
    is_walkable(incoming : Pawn): boolean {
        return !(incoming as Pawn).has_item
    }


    //Action
    @OnlyPawn
    processIncomingObject(object: Pawn): void {
        object.equip(this)
    }
}


export { Item };