import board_config from "../config/board_template.json";
import { GameManager } from "../managers/GameManager";

export const GAME_MANAGER = new GameManager(board_config);

