import { Board } from "../engine/board";
import { EngineObject } from "../engine/environments";
import { Vector2D } from "../engine/math";
import { Player } from "../engine/player";
import { CheckTurn } from "../engine/preconditionners/logic_cond";
import { Tile } from "../engine/tile";
import { GameManager } from "./GameManager";

export class GameInterface implements EngineObject{
    log_tag?: string = "GAME_INTERFACE";
    private __player : Player;
    private __game : GameManager;

    constructor(game : GameManager, player : Player) {
        this.__game = game;
        this.__player = player;
    }

    //Getters
    get is_my_turn() : boolean{
        return this.__game.current_turn == this.__player.color
    }
    get board() : Board{
        return this.__game.board
    }
    get player() : Player{
        return this.__player
    }

    //Public interface
    public canMove(src : Vector2D, dst : Vector2D) : boolean{
        return this.__game.canMove(src, dst)
    }

    public canAttack(src : Vector2D, dst : Vector2D) : boolean{
        return this.__game.canAttack(src, dst)
    }
    public possibleMoves(src : Vector2D, range : number = 1) : Vector2D[]{
        return this.__game.tiles_manager.possibleMoves(src)
    }
    public possibleAttacks(src : Vector2D, range : number = 1) : Vector2D[]{
        return this.__game.tiles_manager.possibleAttacks(src)
    }
    public tiles(filter? : (tile : Tile) => boolean) : Tile[]{
        return this.__game.tiles_manager.tiles.filter(filter? filter : () => true)
    }
    public tile(pos : Vector2D) : Tile{
        return this.__game.tiles_manager.tile(pos)
    }


    @CheckTurn
    public move(src : Vector2D, dst : Vector2D) : boolean{
        return this.__game.move(src, dst)
    }
    @CheckTurn
    public attack(src : Vector2D, dst : Vector2D) : boolean{
        return this.__game.attack(src, dst)
    }
    @CheckTurn
    public newTurn() : boolean{
        return this.__game.nextTurn()
    }

    

    

}