import { BuildingConfig, GameObjectConfig } from "../../config/config_types";
import { Color } from "../../engine/environments";
import { Vector2D } from "../../engine/math";
import { GameManager } from "../../managers/game_manager";
import { GameObject } from "../game_object";

export class Building extends GameObject{
    log_tag?: string = "BUILDING";
    color: Color;
    config: BuildingConfig;


    constructor(config: BuildingConfig, color: Color, context : GameManager){
        super(config, color, context)
    }

    //Engine

    toString(): string {
        return "BUILDING()"
    }
}