"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GAME_MANAGER = exports.RULE = exports.player_2 = exports.player_1 = void 0;
var board_template_json_1 = __importDefault(require("../config/board_template.json"));
var GameManager_1 = require("../managers/GameManager");
var dotenv = __importStar(require("dotenv"));
var Pawn_1 = require("../game_objects/base_objects/Pawn");
var environments_1 = require("./environments");
var player_3 = require("./player");
exports.player_1 = new player_3.Player(environments_1.Color.BLUE, 'Blue Player');
exports.player_2 = new player_3.Player(environments_1.Color.RED, 'Red Player');
exports.RULE = {
    name: "dev_rule",
    check_victory: function (context) {
        if (context.total_turns > 10)
            return environments_1.Color.WHITE;
        var pawns = context.tiles_manager.objects(function (obj) { return obj instanceof Pawn_1.Pawn; });
        if (pawns.filter(function (pawn) { return pawn.color == environments_1.Color.BLUE; }).length == 0)
            return environments_1.Color.RED;
        if (pawns.filter(function (pawn) { return pawn.color == environments_1.Color.RED; }).length == 0)
            return environments_1.Color.BLUE;
        return undefined;
    }
};
exports.GAME_MANAGER = new GameManager_1.GameManager(exports.RULE, board_template_json_1.default);
dotenv.config({ path: '.env.dev' });
//# sourceMappingURL=config.js.map