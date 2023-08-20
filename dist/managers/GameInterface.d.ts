import { Board } from "../engine/board";
import { EngineObject } from "../engine/environments";
import { Vector2D } from "../engine/math";
import { Player } from "../engine/player";
import { Tile } from "../engine/tile";
import { GameManager } from "./GameManager";
export declare class GameInterface implements EngineObject {
    log_tag?: string;
    private __player;
    private __game;
    constructor(game: GameManager, player: Player);
    get is_my_turn(): boolean;
    get board(): Board;
    get player(): Player;
    canMove(src: Vector2D, dst: Vector2D): boolean;
    canAttack(src: Vector2D, dst: Vector2D): boolean;
    possibleMoves(src: Vector2D, range?: number): Vector2D[];
    possibleAttacks(src: Vector2D, range?: number): Vector2D[];
    get tiles(): Tile[];
    tile(pos: Vector2D): Tile;
    move(src: Vector2D, dst: Vector2D): boolean;
    attack(src: Vector2D, dst: Vector2D): boolean;
    newTurn(): boolean;
}
