"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./engine/config");
var ConsoleView_1 = require("./utils/ConsoleView");
var gameManager = config_1.GAME_MANAGER;
var consoleView = new ConsoleView_1.DevConsoleView(config_1.GAME_MANAGER);
function replacer(key, value) {
    if (key === "object" && value == null) {
        return undefined;
    }
    if (key == "adj_matrix_move") {
        return undefined;
    }
    return value;
}
// console.log(serialized);
//# sourceMappingURL=main.js.map