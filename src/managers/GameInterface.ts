import { Board } from "../engine/board";
import { EngineObject } from "../engine/environments";
import { Vector2D, to_index } from "../engine/math";
import { Player } from "../engine/player";
import { CheckTurn } from "../engine/preconditionners/logic_cond";
import { Tile } from "../engine/tile";
import { GameManager } from "./GameManager";

const EMPTY_TILE = new Tile(new Vector2D(-1,-1), null)

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
    get tiles () : Tile[]{
        const width = this.__game.board.config.properties.width
        const height = this.__game.board.config.properties.height
        const size = width * height
        const our_objects = this.__game.tiles_manager.tiles.filter((tile) => tile.object?.color == this.__player.color)
        const visibleTiles : Vector2D[] = our_objects.flatMap((tile) => this.__game.tiles_manager.visibleTiles(tile.pos, tile.object?.config.properties.vision.range ?? 0))
        
        let tiles : Tile[] = []
        tiles.length = size
        tiles = tiles.fill(EMPTY_TILE, 0, width * this.__game.board.config.properties.height)

        our_objects.forEach((tile) => {
            tiles[to_index(tile.pos,width)] = tile
        })
        visibleTiles.forEach((pos) => {
            tiles[to_index(pos,width)] = this.__game.tiles_manager.tile(pos)
        })

        //Verify that all tiles are filled and not undefined
        tiles.forEach((tile) => {
            if(tile == undefined){
                throw new Error("Tile is undefined")
            }
        })
        if(tiles.length != size){
            throw new Error("Tiles array is not the right size")
        }
        return tiles
    }
    
    public tile(pos : Vector2D) : Tile{
        return this.tiles[to_index(pos, this.__game.board.config.properties.width)]
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