import { EngineObject } from "../engine/environments";
import { Vector2D } from "../engine/math";
import { CheckPawnColor } from "../engine/preconditionners/logic_cond";
import { Pawn } from "../game_objects/base_objects/Pawn";
import { GameManager } from "./GameManager";
import { TilesManager } from "./TilesManager";

export class ActionManager implements EngineObject{
    log_tag?: string = "ACTION_MANAGER";

    tiles_manager : TilesManager;
    game_manager : GameManager;

    constructor(game_manager : GameManager){
        this.game_manager = game_manager;
        this.tiles_manager = this.game_manager.tiles_manager;
    }


    //ACTION
    @CheckPawnColor
    public move(src : Vector2D, dst : Vector2D){
        return this.tiles_manager.move(src, dst)
    }

    @CheckPawnColor
    public attack(src : Vector2D, dst : Vector2D){
        return this.tiles_manager.attack(src, dst)
    }

    public nextTurn(){
        this.game_manager.next_turn()
        this.game_manager.tiles_manager.objects().forEach((obj) => obj.processNewTurn())
    }

}