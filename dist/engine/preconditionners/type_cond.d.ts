import { IGameObject } from "../../game_objects/interfaces";
import { EngineObject } from "../environments";
declare function OnlyPawn(originalMethod: any, context: ClassMethodDecoratorContext): (this: EngineObject, object: IGameObject, ...args: any[]) => any;
export { OnlyPawn };
