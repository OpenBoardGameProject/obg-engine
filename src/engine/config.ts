import board_config from "../config/board_template.json";
import { GameManager } from "../managers/GameManager";
import * as dotenv from "dotenv";
import { Rule } from "./environments";
import { Pawn } from "../game_objects/base_objects/Pawn";
import { Color } from "./environments";
import { Player } from "./player";


export const player_1 = new Player(Color.BLUE, 'Blue Player')
export const player_2 = new Player(Color.RED, 'Red Player')

export const RULE : Rule = {
    name : "dev_rule",
    check_victory : (context : GameManager) => {
        if (context.total_turns > 10)
            return Color.WHITE
        
        const pawns = context.tiles_manager.objects((obj) => obj instanceof Pawn) as Pawn[]

        if(pawns.filter((pawn) => pawn.color == Color.BLUE).length == 0)
            return Color.RED
        if(pawns.filter((pawn) => pawn.color == Color.RED).length == 0)
            return Color.BLUE


        return undefined

    }
}

export const GAME_MANAGER = new GameManager(RULE, board_config);

dotenv.config({path : '.env.dev'});
