import { BoardConfig } from "../config/config_types";
import { Color, EngineObject, Rule } from "../engine/environments";
import { Vector2D } from "../engine/math";

import { Board } from "../engine/board";
import { TilesManager } from "./TilesManager";
import { Logger } from "../utils/Logger";
import { Pawn } from "../game_objects/base_objects/Pawn";
import test_pawn from "../config/pawn_template.json"
import test_item from "../config/item_template.json"
import test_building from "../config/building_template.json"
import { Item } from "../game_objects/base_objects/Item";
import { Building } from "../game_objects/base_objects/Building";
import { CheckObject, CheckPawnColor, CheckTurn, CheckVictory } from "../engine/preconditionners/logic_cond";
import { GameManagerEvents } from "../engine/events";
import { Player } from "../engine/player";
import { PrintPositions } from "../utils/BoardVisualization";

class GameManager implements EngineObject {
    log_tag?: string = "GAME_MANAGER";
    private readonly __board: Board;
    private readonly __tiles_manager: TilesManager;
    private readonly __rule: Rule;
    
    //Dictionary of players with color as key
    private __players : {
        [key in Color] : Player
    }
    private __observers : GameManagerEvents[] = [];
    
    private __current_turn: Color = Color.BLUE;
    private __total_turns: number = 0;

    constructor(rule : Rule, boardConfig: BoardConfig, tile_manager? : TilesManager) {
        //Init Board
        this.__board = new Board(boardConfig);
        this.__rule = rule;
        if(tile_manager)
            this.__tiles_manager = tile_manager
        else
            this.__tiles_manager = new TilesManager(this.board);

        this.tiles_manager.dev_addpawn(new Pawn(test_pawn, Color.BLUE), new Vector2D(3,0))
        this.tiles_manager.dev_addpawn(new Pawn(test_pawn, Color.RED), new Vector2D(2,0))
        this.tiles_manager.dev_additem(new Item(test_item, Color.WHITE), new Vector2D(1,0))
        this.tiles_manager.dev_addbuilding(new Building(test_building, Color.WHITE), new Vector2D(0,1))
        this.tiles_manager.dev_addbuilding(new Building(test_building, Color.WHITE), new Vector2D(1,1))
        
        Logger.log(this, "Game Manager Initialized");
    }


    //LOGIC
    @CheckObject
    public canMove(src : Vector2D, dst : Vector2D) : boolean{
        //Check if there is a Pawn on src
        return this.tiles_manager.canMove(src, dst)
    }
    @CheckObject
    public canAttack(src : Vector2D, dst : Vector2D) : boolean{
        //Check if there is a Pawn on src
        return this.tiles_manager.canAttack(src, dst)
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

    get current_turn() : Color{
        return this.__current_turn
    }

    get total_turns() : number{
        return this.__total_turns
    }

    get rule() : Rule{
        return this.__rule
    }

 


    //ACTION
    @CheckObject
    @CheckPawnColor
    public move(src : Vector2D, dst : Vector2D){
        return this.tiles_manager.move(src, dst)
    }
    @CheckObject
    @CheckPawnColor
    public attack(src : Vector2D, dst : Vector2D){
        return this.tiles_manager.attack(src, dst)
    }

    public nextTurn() : boolean{
        this.__total_turns += 1
        this.__current_turn = this.__current_turn == Color.BLUE ? Color.RED : Color.BLUE
        this.tiles_manager.objects().forEach((obj) => obj.processNewTurn())
        return true
    }

    //Event
    public subscribe(observer : GameManagerEvents){
        this.__observers.push(observer)
    }

    public unsubscribe(observer : GameManagerEvents){
        this.__observers = this.__observers.filter((evt) => evt != observer)
    }

    public notify(trigger : (observer : GameManagerEvents) => void)
    {
        this.__observers.forEach((observer) => trigger(observer))
    }


        
}

export { GameManager };