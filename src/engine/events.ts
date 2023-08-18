import { Color } from "./environments";
import { Vector2D } from "./math";

export interface GameManagerEvents {
    onTurnStart?() : void;
    onTurnEnd?() : void;
    onMove?(src : Vector2D, dst : Vector2D) : void;
    onAttack?(src : Vector2D, dst : Vector2D) : void;
    onDeath?(src : Vector2D) : void;
    onNewTurn?() : void;
    onGameEnd?(color : Color) : void;
}