import { ItemConfig } from "../config/config_types";
import { Color } from "../engine/environments";
import { GameObject, DataObject } from "./GameInterfaces";

class Item implements GameObject, DataObject{
    config : ItemConfig;
    constructor(config : ItemConfig, public color : Color){
        this.config = config
    }

    toRepr(): string {
        return this.config.apparence.str
    }

    canMove(): boolean {
        return false
    }
    log_tag?: string;


}


export { Item };