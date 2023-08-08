
import board_config from "./config/board_template.json";
import { Vector2D } from "./engine/math";
import { GameManager } from "./managers/GameManager";
import { PrintBoard } from "./utils/BoardVisualization";


const gameManager = new GameManager(board_config);

PrintBoard(gameManager.tiles_manager, gameManager.board)


console.log(gameManager.canMovePawn(new Vector2D(0,0), new Vector2D(1, 3) ))



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

const serialized = JSON.stringify(gameManager, replacer);
// console.log(serialized);
