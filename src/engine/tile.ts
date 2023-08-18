import { IGameObject , DataObject} from "../game_objects/GameInterfaces";
import { Vector2D } from "./math";


class Tile implements DataObject{
    object? : IGameObject | null

    constructor(public pos : Vector2D, object: IGameObject | null = null){
        this.object = object
    }

    get has_object(){
        return this.object != null
    }

    canMove(dst : Vector2D) : boolean{
        return this.object?.canMove(this.pos, dst) ?? false
    }
    canAttack(dst : Vector2D) : boolean{
        return this.object?.canAttack(this.pos, dst) ?? false
    }
    
    canWalkOn(incoming : IGameObject) : boolean{
        return this.object?.is_walkable(incoming) ?? true
    }

    toString(): string{
        return `Tile(${this.pos.x}, ${this.pos.y}) : ${this.object?.toString() ?? "Empty"}`
    }

}


export { Tile };