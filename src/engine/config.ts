import board_config from "../config/board_template.json";
import { GameManager } from "../managers/GameManager";
import * as dotenv from "dotenv";
import { Rule } from "./environments";
import { Pawn } from "../game_objects/base_objects/Pawn";
import { Color } from "./environments";
import { Player } from "./player";


export const player_1 = new Player(Color.BLUE, 'Blue Player')
export const player_2 = new Player(Color.RED, 'Red Player')


dotenv.config({path : '.env.dev'});
