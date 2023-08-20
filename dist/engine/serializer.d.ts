import { GameManager } from "../managers/GameManager";
import { BoardConfig } from "../config/config_types";
export type ExportedData = {
    config: BoardConfig;
    board: object[];
};
export declare class GameSerializer {
    static saveGame(game: GameManager): ExportedData;
    static loadGame(data: ExportedData): GameManager;
    static stringify(data: ExportedData): string;
}
