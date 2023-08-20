import { IGameObject, DataObject } from "../game_objects/interfaces";
import { Vector2D } from "./math";
declare class Tile implements DataObject {
    pos: Vector2D;
    object?: IGameObject | null;
    constructor(pos: Vector2D, object?: IGameObject | null);
    get has_object(): boolean;
    canMove(dst: Vector2D): boolean;
    canAttack(dst: Vector2D): boolean;
    canWalkOn(incoming: IGameObject): boolean;
    toString(): string;
}
export { Tile };
