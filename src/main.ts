
import board_config from "./config/board_template.json";
import { GAME_MANAGER } from "./engine/config";
import { Vector2D } from "./engine/math";
import { GameSerializer } from "./engine/serializer";
import { GameManager } from "./managers/GameManager";
import { PrintBoard, PrintPositions } from "./utils/BoardVisualization";
import { DevConsoleView } from "./utils/ConsoleView";


const gameManager = GAME_MANAGER;

const consoleView = new DevConsoleView(GAME_MANAGER);



function replacer(key, value){
    if (key === "object" && value == null){
        return undefined;
    }
    if (key == "adj_matrix_move")
    {
        return undefined;
    }
    return value;
}

// console.log(serialized);
