import { ItemConfig } from "../../config/config_types";
import { Color } from "../../engine/environments";
import { OnlyPawn } from "../../engine/preconditionners/type_cond";
import { DataObject } from "../interfaces";
import { GameObject } from "../GameObject";
import { Pawn } from "./Pawn";
import { GameManager } from "../../managers/GameManager";

class Item extends GameObject implements DataObject{
    config : ItemConfig;
    log_tag?: string = "ITEM";

    constructor(config : ItemConfig, public color : Color, public context : GameManager){
        super(config, color, context)
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