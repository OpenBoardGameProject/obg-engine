import { BoardConfig } from "../config/config_types";
import { Color, EngineObject } from "../engine/environments";
import { Vector2D } from "../engine/math";

import { Board } from "../game_objects/Board";
import { TilesManager } from "./TilesManager";
import { Logger } from "../utils/Logger";
import { Pawn } from "../game_objects/Pawn";
import test_pawn from "../config/pawn_template.json"

class GameManager implements EngineObject {
    log_tag?: string = "GAME_MANAGER";
    private readonly __board: Board;
    private readonly __tiles_manager: TilesManager;

    constructor(boardConfig: BoardConfig) {
        //Init Board
        this.__board = new Board(boardConfig);
        this.__tiles_manager = new TilesManager(boardConfig);
        this.tiles_manager.dev_addpawn(new Pawn(test_pawn, Color.BLUE), new Vector2D(0,0))
        Logger.log(this, "Game Manager Initialized");

    }



    public canMovePawn(src : Vector2D, dst : Vector2D) : boolean{
        //Check if there is a Pawn on src
        const tile = this.tiles_manager.tile(src)

        if(!tile.object){
            Logger.error(this, "Their is no pawn to move")
            return false
        }
        if(!tile.object?.canMove()){
            Logger.error(this, "This object can't move")
            return false
        }
        if(!(tile.object instanceof Pawn)){
            Logger.error(this, "This is not a Pawn")
        }

        const pawn : Pawn = tile.object as Pawn

        const possible_moves = this.board.possible_moves_range(src, pawn.config.properties.move.range)
        const found = possible_moves.find((pos) => pos.equals(dst))
        if(found){
            return !this.tiles_manager.tile(found).has_object()
        }else
            return false 

    }




    start() {
    }


    // Getter
    get board() : Board{
        return this.__board
    }

    get tiles_manager() : TilesManager{
        return this.__tiles_manager
    }

}

export { GameManager };