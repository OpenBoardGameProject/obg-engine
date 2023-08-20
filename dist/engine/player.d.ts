import { Color, EngineObject } from "./environments";
declare class Player implements EngineObject {
    color: Color;
    name: string;
    log_tag?: string;
    constructor(color: Color, name?: string);
}
export { Player };
