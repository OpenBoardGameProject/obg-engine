import { BoardConfig } from "../config/config_types";
import { Color, EngineObject } from "../engine/environments";
import { Vector2D } from "../engine/math";

import { Board } from "../engine/board";
import { TilesManager } from "./TilesManager";
import { Logger } from "../utils/Logger";
import { Pawn } from "../game_objects/Pawn";
import test_pawn from "../config/pawn_template.json"
import test_item from "../config/item_template.json"
import { Item } from "../game_objects/Item";
import { Building } from "../game_objects/Building";

class GameManager implements EngineObject {
    log_tag?: string = "GAME_MANAGER";
    private readonly __board: Board;
    private readonly __tiles_manager: TilesManager;

    constructor(boardConfig: BoardConfig) {
        //Init Board
        this.__board = new Board(boardConfig);
        
        this.__tiles_manager = new TilesManager(this.board);
        this.tiles_manager.dev_addpawn(new Pawn(test_pawn, Color.BLUE), new Vector2D(3,0))
        this.tiles_manager.dev_addpawn(new Pawn(test_pawn, Color.RED), new Vector2D(2,0))
        this.tiles_manager.dev_additem(new Item(test_item, Color.WHITE), new Vector2D(1,0))
        this.tiles_manager.dev_addbuilding(new Building({
            "properties": {
            },
            'apparence': {
                'str' : '🝚 '
            }
        }, Color.WHITE), new Vector2D(0,1))
        this.tiles_manager.dev_addbuilding(new Building({
            "properties": {
            },
            'apparence': {
                'str' : '🝚 '
            }
        }, Color.WHITE), new Vector2D(1,1))
        Logger.log(this, "Game Manager Initialized");
    }

    public canMove(src : Vector2D, dst : Vector2D) : boolean{
        //Check if there is a Pawn on src
        return this.tiles_manager.canMove(src, dst)

    }

    public move(src : Vector2D, dst : Vector2D){
        return this.tiles_manager.move(src, dst)
    }

    public attack(src : Vector2D, dst : Vector2D){
        return this.tiles_manager.attack(src, dst)
    }




    start() {
        //changes
    
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