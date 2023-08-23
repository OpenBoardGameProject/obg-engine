
import board_config from "./config/board_template.json";
import { Vector2D } from "./engine/math";
import { ResourceImporter } from "./engine/resource_importer";
import { GameSerializer } from "./engine/serializer";
import { GameManager } from "./managers/GameManager";
import { PrintBoard, PrintPositions } from "./utils/BoardVisualization";
import { DevConsoleView } from "./utils/ConsoleView";


const importer = new ResourceImporter().import();
const gameManager = new GameManager(importer.getRule('dev_rule'), board_config);

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
