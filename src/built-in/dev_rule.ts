import { Rule, Color} from "../engine/environments"
import { Pawn } from "../game_objects/base_objects/Pawn"
import { GameManager } from "../managers/GameManager"
import { RESOURCE } from "../engine/config"
import { Tile } from "../engine/tile"
import { Item } from "../game_objects/base_objects/Item"
import { BuildingConfig, ItemConfig, PawnConfig } from "../config/config_types"
import { Building } from "../game_objects/base_objects/Building"
import { TilesManager } from "../managers/TilesManager"

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
    },
    initial_tiles : (context: GameManager) => {
        const tiles = TilesManager.generate_empty_grid(context.board.config)

        tiles[1].object = new Item(RESOURCE.getConfig('test_item') as ItemConfig, Color.WHITE, context)
        tiles[2].object = new Item(RESOURCE.getConfig('test_item2') as ItemConfig, Color.WHITE, context)
        tiles[context.board.config.properties.width].object = new Building(RESOURCE.getConfig('test_building') as BuildingConfig, Color.WHITE, context)

        tiles[context.board.config.properties.width + 1].object = new Pawn(RESOURCE.getConfig('test_pawn') as PawnConfig, Color.BLUE, context)
        tiles[context.board.config.properties.width + 2].object = new Pawn(RESOURCE.getConfig('test_pawn') as PawnConfig, Color.RED, context)

        return tiles
    }
}
