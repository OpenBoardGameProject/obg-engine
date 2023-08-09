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

    canMove(dst : Vector2D) : boolean{
        return this.object?.canMove(this.pos, dst) ?? false
    }

    canWalkOn(incoming : GameObject) : boolean{
        return this.object?.is_walkable(incoming) ?? true
    }

    toString(): string{
        return `Tile(${this.pos.x}, ${this.pos.y}) : ${this.object?.toString() ?? "Empty"}`
    }

}



export { Tile };