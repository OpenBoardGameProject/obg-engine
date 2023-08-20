import { ItemConfig } from "../../config/config_types";
import { Color } from "../../engine/environments";
import { DataObject } from "../interfaces";
import { GameObject } from "../GameObject";
import { Pawn } from "./Pawn";
declare class Item extends GameObject implements DataObject {
    color: Color;
    config: ItemConfig;
    log_tag?: string;
    constructor(config: ItemConfig, color: Color);
    toString(): string;
    is_walkable(incoming: Pawn): boolean;
    processIncomingObject(object: Pawn): void;
}
export { Item };
