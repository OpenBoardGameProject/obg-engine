import { GameManager } from "../managers/game_manager";
import { BoardConfig } from "../config/config_types";
import { to_index } from "./math";
import { stringify } from "querystring";
import { IGameObject } from "../game_objects/interfaces";
import { TilesManager } from "../managers/tiles_managers";

export type ExportedData = {
    config : BoardConfig,
    board : object[]
}

export class GameSerializer {
    static saveGame(game : GameManager) : ExportedData{
        const size = game.board.config.properties.height * game.board.config.properties.width
        const objects = game.tiles_manager.tiles_with_objects()
        let board : object[] = []
        board.length = size;
        board.fill(undefined, 0, size)

        objects.forEach((obj) => {
            board[to_index(obj.pos, game.board.config.properties.width)] = obj.object
        })
        

        return {
            config : game.board.config,
            board : board
        };
    }
//TODO: Fix this
    static loadGame(data : ExportedData) : GameManager{
        let game : GameManager = new GameManager(undefined, data.config)

        const tiles = game.tiles_manager.tiles.map((tile, index) => {
            const object : IGameObject = data.board[index] as IGameObject
            if(object == undefined)
                return tile
            tile.object = object
            return tile
        })
        return new GameManager(undefined, data.config, new TilesManager(game.board, tiles))
    }

    static stringify(data : ExportedData) : string {
        return JSON.stringify(data, (key, value)=>{
            if (key=='log_tag')
                return undefined
            return value
        }, '\t')
    }

}