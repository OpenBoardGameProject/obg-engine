import { type } from "os";
import { GameManager } from "../managers/game_manager";
import { Tile } from "./tile";

enum Dir{
    NO_DIR = 0,
    N = 1,
    NE = 2,
    E = 3,
    SE = 4,
    S = 5,
    SW = 6,
    W = 7,
    NW = 8
}

enum Color{
    WHITE = 0,
    RED = 1,
    BLUE = 2,        
    
}

interface EngineObject {
    log_tag?: string;
}

type Rule = {
    name : string,
    check_victory : (context : GameManager) => Color | undefined
    initial_tiles : (context : GameManager) => Tile[]
}

export { Dir , EngineObject, Color};
export type { Rule };