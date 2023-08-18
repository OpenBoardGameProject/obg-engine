import { GameManager } from "../../managers/GameManager";
import { Logger } from "../../utils/Logger";
import { Vector2D } from "../math";

//GAMEMANAGER PRECOND
function CheckPawnColorTurn(originalMethod : any, context : ClassMethodDecoratorContext){
    function tmp(this : GameManager,src : Vector2D, ...args : any[]){
        if(this.current_turn == this.tiles_manager.tile(src).object.color)
            return originalMethod.call(this,src, ...args)
        else{
            Logger.error(this, "Not your turn")
            return false;  
        } 
    }
    return tmp;
}


export {CheckPawnColorTurn}