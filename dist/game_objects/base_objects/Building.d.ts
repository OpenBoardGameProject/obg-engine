import { BuildingConfig } from "../../config/config_types";
import { Color } from "../../engine/environments";
import { GameObject } from "../GameObject";
export declare class Building extends GameObject {
    log_tag?: string;
    color: Color;
    config: BuildingConfig;
    constructor(config: BuildingConfig, color: Color);
    toString(): string;
}
