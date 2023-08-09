import { ItemConfig } from "../config/config_types";
import { Color } from "../engine/environments";
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

    @OnlyPawn
    processIncomingObject(object: Pawn): void {
        object.equip(this)
    }

    can_pass_through(incoming: GameObject): boolean {
        return true
    }

    toRepr(): string {
        return this.config.apparence.str
    }

    canMove(): boolean {
        return false
    }

    @OnlyPawn
    is_walkable(incoming : Pawn): boolean {
        return !(incoming as Pawn).has_item
    }


}


export { Item };