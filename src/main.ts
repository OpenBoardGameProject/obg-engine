
import board_config from "./config/board_template.json";
import { BoardConfig } from "./config/config_types";
import { RESOURCE } from "./engine/config";
import { Vector2D } from "./engine/math";
import { ResourceImporter } from "./engine/resource_importer";
import { GameSerializer } from "./engine/serializer";
import { GameManager } from "./managers/GameManager";
import { PrintBoard, PrintPositions } from "./utils/BoardVisualization";
import { DevConsoleView } from "./utils/ConsoleView";


const gameManager = new GameManager(RESOURCE.getRule('dev_rule'), RESOURCE.getConfig('template_board') as BoardConfig);

const consoleView = new DevConsoleView(gameManager);



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
