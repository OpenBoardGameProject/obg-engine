import { GameObjectConfig } from "../config/config_types";
import { EngineObject } from "../engine/environments";
import { Color } from "../engine/environments";
import { Vector2D } from "../engine/math";
import { Tile } from "../engine/tile";
interface IGameObject extends EngineObject {
    color: Color;
    toString(): string;
    config: GameObjectConfig;
    toRepr(): string;
    can_pass_through(incoming: IGameObject): boolean;
    is_walkable(incoming: IGameObject): boolean;
    canMove(src: Vector2D, dst: Vector2D): boolean;
    canAttack(src: Vector2D, dst: Vector2D): boolean;
    is_attackable(incoming: IGameObject): boolean;
    is_dead(tile?: Tile): boolean;
    is_transparent(): boolean;
    processIncomingObject(object: IGameObject): void;
    processMove(): void;
    processIncomingAttack(object: IGameObject): void;
    processIncomingDefense(object: IGameObject): void;
    processDeath(): void;
    processNewTurn(): void;
}
interface DataObject extends EngineObject {
    toString(): string;
}
export { IGameObject, DataObject };
