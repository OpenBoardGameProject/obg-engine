"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevConsoleView = void 0;
var process_1 = require("process");
var BoardVisualization_1 = require("./BoardVisualization");
var readline = __importStar(require("readline"));
//CONFIG
var ConsoleCommands_1 = require("./ConsoleCommands");
var environments_1 = require("../engine/environments");
var config_1 = require("../engine/config");
var GameInterface_1 = require("../managers/GameInterface");
var ConsoleView = /** @class */ (function () {
    function ConsoleView(game) {
        var _this = this;
        this.game = game;
        this.__commands = [];
        this.wrong_args_error = { 'message': "Wrong number of arguments", 'is_error': true };
        this.__commands =
            [
                new ConsoleCommands_1.MoveCommand(this.game),
                new ConsoleCommands_1.PrintCommand(this.game),
                new ConsoleCommands_1.AttackCommand(this.game),
                new ConsoleCommands_1.QuitCommand(this.game)
            ];
        this.player_1 = new GameInterface_1.GameInterface(this.game, config_1.player_1);
        this.player_2 = new GameInterface_1.GameInterface(this.game, config_1.player_2);
        this.current_player = this.player_1;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.render();
        this.rl.question("Command > ", function (input) { return _this.processInput(input); });
        this.game.subscribe(this);
    }
    ConsoleView.prototype.render = function () {
        (0, BoardVisualization_1.PrintBoard)(this.current_player.tiles, this.game.board);
        console.log("Turn : ".concat(environments_1.Color[this.game.current_turn], " ; Playing with : ").concat(this.current_player.player.name));
    };
    ConsoleView.prototype.onCommandTrigger = function (command, args) {
        return { 'message': "Command success", 'is_error': false };
    };
    Object.defineProperty(ConsoleView.prototype, "commands", {
        get: function () {
            return this.__commands;
        },
        enumerable: false,
        configurable: true
    });
    ConsoleView.prototype.get_command = function (command) {
        return this.commands.find(function (cmd) { return cmd.name == command; });
    };
    ConsoleView.prototype.processInput = function (input) {
        var _this = this;
        //RESET CONSOLE
        if (process.env.AUTO_CLEAR)
            console.clear();
        //PARSE INPUT
        var input_split = input.split(" ");
        var command = input_split[0];
        var args = input_split.slice(1);
        //Check if it's CTRL + S
        if (input === 's') { // '\u0013' is the ASCII control character for CTRL+S
            // Handle CTRL+S action here
            console.log("Switching Player");
            this.current_player = this.current_player == this.player_1 ? this.player_2 : this.player_1;
            // Then resume listening for user input
            this.render();
            this.rl.question(">", function (newInput) { return _this.processInput(newInput); });
            return; // Exit the function early since CTRL+S doesn't need command processing
        }
        //EXECUTE COMMAND
        var cmd = this.get_command(command);
        if (cmd) {
            cmd.execute.apply(cmd, __spreadArray([this.current_player], args, false));
            if (cmd.output.is_error)
                console.error(cmd.output.message);
            else
                console.log(cmd.output.message);
        }
        else {
            console.error("Command not found");
        }
        this.render();
        this.rl.question(">", function (input) { return _this.processInput(input); });
    };
    ConsoleView.prototype.onGameEnd = function (color) {
        console.log("Game End : ".concat(environments_1.Color[color]));
        (0, process_1.exit)(0);
    };
    return ConsoleView;
}());
var DevConsoleView = /** @class */ (function (_super) {
    __extends(DevConsoleView, _super);
    function DevConsoleView(game) {
        var _this = _super.call(this, game) || this;
        _this.game = game;
        _this.__commands.push(new ConsoleCommands_1.SpawnCommand(_this.game));
        _this.__commands.push(new ConsoleCommands_1.NewTurn(_this.game));
        return _this;
    }
    return DevConsoleView;
}(ConsoleView));
exports.DevConsoleView = DevConsoleView;
//# sourceMappingURL=ConsoleView.js.map