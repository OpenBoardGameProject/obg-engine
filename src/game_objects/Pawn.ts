import { GameObject, DataObject } from "./GameInterfaces";
import { Item } from "./Item";
import { PawnConfig } from "../config/config_types";
import { Color } from "../engine/environments";

class Pawn implements GameObject, DataObject{
    
    //Config
    hasBeenPlayed : boolean;
    config : PawnConfig;

    //In game data
    item? : Item;


    canMove(): boolean {
        return !this.hasBeenPlayed
    }
    
    toRepr(): string {
        let item_str = this.item != undefined ? this.item?.toRepr() : ' '
        return this.config.apparence.str + item_str
    }
    constructor(config : PawnConfig, public color : Color){
        this.config = config;
    }



}


export { Pawn };
