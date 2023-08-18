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
import { CheckPawnColor, CheckTurn, CheckVictory } from "../engine/preconditionners/logic_cond";
import { GameManagerEvents } from "../engine/events";
import { Player } from "../engine/player";
import { ActionManager } from "./ActionManager";

class GameManager implements EngineObject {
    log_tag?: string = "GAME_MANAGER";
    private readonly __board: Board;
    private readonly __tiles_manager: TilesManager;
    private readonly __rule: Rule;
    private readonly __action_manager: ActionManager;
    
    //Dictionary of players with color as key
    private __players : {
        [key in Color] : Player
    }
    private __observers : GameManagerEvents[] = [];
    
    private __current_turn: Color = Color.BLUE;
    private __total_turns: number = 0;

    constructor(rule : Rule, boardConfig: BoardConfig) {
        //Init Board
        this.__board = new Board(boardConfig);
        this.__rule = rule;
        this.__tiles_manager = new TilesManager(this.board);
        this.__action_manager = new ActionManager(this)

        this.tiles_manager.dev_addpawn(new Pawn(test_pawn, Color.BLUE), new Vector2D(3,0))
        this.tiles_manager.dev_addpawn(new Pawn(test_pawn, Color.RED), new Vector2D(2,0))
        this.tiles_manager.dev_additem(new Item(test_item, Color.WHITE), new Vector2D(1,0))
        this.tiles_manager.dev_addbuilding(new Building(test_building, Color.WHITE), new Vector2D(0,1))
        this.tiles_manager.dev_addbuilding(new Building(test_building, Color.WHITE), new Vector2D(1,1))
        Logger.log(this, "Game Manager Initialized");
    }


    //LOGIC
    public canMove(src : Vector2D, dst : Vector2D) : boolean{
        //Check if there is a Pawn on src
        return this.tiles_manager.canMove(src, dst)
    }

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

    next_turn(){
        this.__total_turns += 1
        this.__current_turn = this.__current_turn == Color.BLUE ? Color.RED : Color.BLUE
    }

    action_manager?(player : Player){
        if(this.current_turn != player.color){
            Logger.error(this, 'Not your turn')
            return undefined
        }
        return this.__action_manager
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