import { Pawn } from "../../game_objects/base_objects/Pawn";
import { ActionManager } from "../../managers/ActionManager";
import { GameManager } from "../../managers/GameManager";
import { Logger } from "../../utils/Logger";
import { Vector2D } from "../math";
import { Player } from "../player";

//ACTION MANAGER PRECOND
function CheckPawnColor(originalMethod : any, context : ClassMethodDecoratorContext){
    function tmp(this : ActionManager,src : Vector2D, ...args : any[]){
        if(this.game_manager.current_turn == this.tiles_manager.tile(src).object.color)
            return originalMethod.call(this,src, ...args)
        else{
            Logger.error(this, "Not your color")
            return false;  
        } 
    }
    return tmp;
}

//GAME MANAGER PRECOND
function CheckVictory(originalMethod : any, context : ClassMethodDecoratorContext){
    function tmp(this : GameManager, ...args : any[]){
        const result = originalMethod.call(this, ...args)
        const color_victory = this.rule.check_victory(this)
        if (color_victory){
            this.notify((observer) => observer.onGameEnd ? observer.onGameEnd(color_victory) : null )
        }
        return result
        
    }
    return tmp;
}

function CheckTurn(originalMethod : any, context : ClassMethodDecoratorContext){
    function tmp(this : GameManager, player : Player,...args : any[]){
        if(this.current_turn == player.color)
            return originalMethod.call(this,player, ...args)
        else{
            Logger.error(this, "Not your turn")
            return false;  
        }
    }
    return tmp;
}


//PAWN PRECOND

function TriggerPlayed(originalMethod : any, context : ClassMemberDecoratorContext){
    function tmp (this : Pawn, ...args : any[]){
        if(process.env.INFINITY_TURN)
            this.hasBeenPlayed = true
        return originalMethod.call(this, ...args)
    }
    return tmp
}

function HasBeenPlayed(originalMethod : any, context : ClassMemberDecoratorContext){
    function tmp (this : Pawn, ...args : any[]){
        if(!this.hasBeenPlayed)
            return originalMethod.call(this, ...args)
       else{
            Logger.error(this, "Pawn has already been played")
            return false
        }
    }
    return tmp
}


export {CheckPawnColor, CheckVictory, CheckTurn, TriggerPlayed, HasBeenPlayed}

