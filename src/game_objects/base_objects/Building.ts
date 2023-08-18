import { BuildingConfig, GameObjectConfig } from "../../config/config_types";
import { Color } from "../../engine/environments";
import { Vector2D } from "../../engine/math";
import { GameObject } from "../GameObject";
import { IGameObject } from "../GameInterfaces";

export class Building extends GameObject{
    log_tag?: string = "BUILDING";
    color: Color;
    config: BuildingConfig;


    constructor(config: BuildingConfig, color: Color){
        super(config, color)
    }

    //Engine

    toString(): string {
        return "BUILDING()"
    }
}