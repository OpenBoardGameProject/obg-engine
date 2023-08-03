import { BoardConfig } from "../config/config_types";

import { Board } from "../game_objects/Board";

class GameManager {
    private board: Board;
    constructor(boardConfig: BoardConfig) {
        this.board = new Board(boardConfig);
        console.log(this.board.toString());
    }
    start() {
    }

}

export { GameManager };