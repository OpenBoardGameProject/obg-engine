import { Rule, Color} from "../engine/environments"
import { Pawn } from "../game_objects/base_objects/Pawn"
import { GameManager } from "../managers/GameManager"
import { RESOURCE } from "../engine/config"

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
