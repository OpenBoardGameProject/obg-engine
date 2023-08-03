
import board_config from "./config/board.json";
import { GameManager } from "./managers/GameManager";

const gameManager = new GameManager(board_config);

gameManager.start();

