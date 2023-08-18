import { GameObject } from "../../game_objects/GameInterfaces";
import { Pawn } from "../../game_objects/base_objects/Pawn";
import { Vector2D } from "../math";
import { GAME_MANAGER } from "../config";



function CurrentTile(originalMethod : any, context : ClassMethodDecoratorContext){
    function tmp(this : GameObject, ...args : any[]){
        // Find the tile where the object is
        const object_tile = GAME_MANAGER.tiles_manager.tiles_with_objects((obj) => obj == this)
        if(object_tile.length == 0)
            throw new Error("Object not found")
        return originalMethod.call(this, object_tile[0], ...args)
    }
    return tmp;
}


export {CurrentTile}