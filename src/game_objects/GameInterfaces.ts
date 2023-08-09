
import { GameObjectConfig } from "../config/config_types";
import { EngineObject } from "../engine/environments";
import { Color } from "../engine/environments";
import { Vector2D } from "../engine/math";

type Context = {
    game_object : GameObject,
    is_pawn : boolean,
    is_item : boolean,
}

interface GameObject extends EngineObject{
    color: Color;
    toString(): string;
    config: GameObjectConfig;
    toRepr() : string;

    //Game Logic
    can_pass_through(incoming : GameObject) : boolean;
    is_walkable(incoming : GameObject) : boolean;
    canMove(src : Vector2D, dst : Vector2D) : boolean;
    processIncomingObject(object : GameObject) : void;

}

interface DataObject extends EngineObject {
    toString(): string;
}

export { GameObject, DataObject};

