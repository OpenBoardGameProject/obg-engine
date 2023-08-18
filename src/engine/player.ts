import { Color, EngineObject } from "./environments";

class Player implements EngineObject{
    log_tag?: string = "PLAYER";


    constructor(public color : Color, public name : string = 'Default'){

    }





}

export { Player };