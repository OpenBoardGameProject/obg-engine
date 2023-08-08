import { GameObject , DataObject} from "./GameInterfaces";
import { Vector2D } from "../engine/math";
class Tile implements DataObject{
    object? : GameObject | null

    constructor(public pos : Vector2D, object: GameObject | null = null){
        this.object = object
    }

    has_object(){
        return this.object != null
    }


    toString(): string{
        if (this.object != null){
            return `[${this.object.toString()}]`;
        }
        return `[ ]`;
    }

}



export { Tile };