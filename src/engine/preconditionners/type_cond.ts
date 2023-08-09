import { GameObject } from "../../game_objects/GameInterfaces";
import { Pawn } from "../../game_objects/Pawn";
import { Vector2D } from "../math";




function OnlyPawn(originalMethod : any, context : ClassMethodDecoratorContext){
    function tmp(this : any, object : GameObject, ...args : any[]){
        if(object instanceof Pawn)
            return originalMethod.call(this, object, args)
        else return false;
    }
    return tmp;
}


export {OnlyPawn}