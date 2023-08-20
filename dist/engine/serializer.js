"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSerializer = void 0;
var GameManager_1 = require("../managers/GameManager");
var math_1 = require("./math");
var config_1 = require("./config");
var TilesManager_1 = require("../managers/TilesManager");
var GameSerializer = /** @class */ (function () {
    function GameSerializer() {
    }
    GameSerializer.saveGame = function (game) {
        var size = game.board.config.properties.height * game.board.config.properties.width;
        var objects = game.tiles_manager.tiles_with_objects();
        var board = [];
        board.length = size;
        board.fill(undefined, 0, size);
        objects.forEach(function (obj) {
            board[(0, math_1.to_index)(obj.pos, game.board.config.properties.width)] = obj.object;
        });
        return {
            config: game.board.config,
            board: board
        };
    };
    GameSerializer.loadGame = function (data) {
        var game = new GameManager_1.GameManager(config_1.RULE, data.config);
        var tiles = game.tiles_manager.tiles.map(function (tile, index) {
            var object = data.board[index];
            if (object == undefined)
                return tile;
            tile.object = object;
            return tile;
        });
        return new GameManager_1.GameManager(config_1.RULE, data.config, new TilesManager_1.TilesManager(game.board, tiles));
    };
    GameSerializer.stringify = function (data) {
        return JSON.stringify(data, function (key, value) {
            if (key == 'log_tag')
                return undefined;
            return value;
        }, '\t');
    };
    return GameSerializer;
}());
exports.GameSerializer = GameSerializer;
//# sourceMappingURL=serializer.js.map