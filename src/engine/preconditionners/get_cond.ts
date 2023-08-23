import { IGameObject } from "../../game_objects/interfaces";
import { Pawn } from "../../game_objects/base_objects/Pawn";
import { Vector2D } from "../math";



function CurrentTile(originalMethod : any, context : ClassMethodDecoratorContext){
    function tmp(this : IGameObject, ...args : any[]){
        // Find the tile where the object is
        const object_tile = this.context.tiles_manager.tiles_with_objects((obj) => obj == this)
        if(object_tile.length == 0)
            throw new Error("Object not found")
        return originalMethod.call(this, object_tile[0], ...args)
    }
    return tmp;
}


export {CurrentTile}