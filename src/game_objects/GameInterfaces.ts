
import { GameObjectConfig } from "../config/config_types";
import { EngineObject } from "../engine/environments";
import { Color } from "../engine/environments";
interface GameObject extends EngineObject{
    color: Color;
    toString(): string;
    canMove() : boolean;
    config: GameObjectConfig;
    toRepr() : string;

}

interface DataObject extends EngineObject {
    toString(): string;
}

export { GameObject, DataObject };
