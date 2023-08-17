import board_config from "../config/board_template.json";
import { GameManager } from "../managers/GameManager";
import * as dotenv from "dotenv";
export const GAME_MANAGER = new GameManager(board_config);

dotenv.config({path : '.env.dev'});
