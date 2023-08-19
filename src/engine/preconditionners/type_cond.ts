import { IGameObject } from "../../game_objects/interfaces";
import { Pawn } from "../../game_objects/base_objects/Pawn";
import { EngineObject } from "../environments";




function OnlyPawn(originalMethod : any, context : ClassMethodDecoratorContext){
    function tmp(this : EngineObject, object : IGameObject, ...args : any[]){
        if(object instanceof Pawn)
            return originalMethod.call(this, object, ...args)
        else return false;
    }
    return tmp;
}


export {OnlyPawn}