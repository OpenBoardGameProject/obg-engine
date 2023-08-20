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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewTurn = exports.QuitCommand = exports.SpawnCommand = exports.PrintCommand = exports.AttackCommand = exports.MoveCommand = exports.ConsoleCommand = void 0;
var math_1 = require("../engine/math");
var Pawn_1 = require("../game_objects/base_objects/Pawn");
var BoardVisualization_1 = require("./BoardVisualization");
//CONFIG
var pawn_template_json_1 = __importDefault(require("../config/pawn_template.json"));
var item_template_json_1 = __importDefault(require("../config/item_template.json"));
var building_template_json_1 = __importDefault(require("../config/building_template.json"));
var environments_1 = require("../engine/environments");
var Item_1 = require("../game_objects/base_objects/Item");
var Building_1 = require("../game_objects/base_objects/Building");
var WRONG_ARGS_ERROR = { 'message': "Wrong number of arguments", 'is_error': true };
var COMMAND_OK = { 'message': "Command success", 'is_error': false };
var ConsoleCommand = /** @class */ (function () {
    function ConsoleCommand(name, minArgs, description) {
        this.name = name;
        this.minArgs = minArgs;
        this.description = description;
        this.__output = COMMAND_OK;
    }
    Object.defineProperty(ConsoleCommand.prototype, "output", {
        get: function () {
            return this.__output;
        },
        set: function (value) {
            this.__output = value;
        },
        enumerable: false,
        configurable: true
    });
    ConsoleCommand.prototype.execute = function (player) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.output = COMMAND_OK;
        if (args.length < this.minArgs) {
            this.output = WRONG_ARGS_ERROR;
            return this;
        }
        return this;
    };
    return ConsoleCommand;
}());
exports.ConsoleCommand = ConsoleCommand;
var MoveCommand = /** @class */ (function (_super) {
    __extends(MoveCommand, _super);
    function MoveCommand(context) {
        return _super.call(this, "move", 2, "move src dst") || this;
    }
    MoveCommand.prototype.execute = function (player) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (_super.prototype.execute.apply(this, __spreadArray([player], args, false)).output.is_error)
            return this;
        var src = math_1.Vector2D.from_str(args[0]);
        var dst = math_1.Vector2D.from_str(args[1]);
        if (!player.move(src, dst)) {
            this.output = { 'message': "Can't move", 'is_error': true };
        }
        return this;
    };
    return MoveCommand;
}(ConsoleCommand));
exports.MoveCommand = MoveCommand;
var AttackCommand = /** @class */ (function (_super) {
    __extends(AttackCommand, _super);
    function AttackCommand(context) {
        return _super.call(this, "attack", 2, "attack src dst") || this;
    }
    AttackCommand.prototype.execute = function (player) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (_super.prototype.execute.apply(this, __spreadArray([player], args, false)).output.is_error)
            return this;
        var src = math_1.Vector2D.from_str(args[0]);
        var dst = math_1.Vector2D.from_str(args[1]);
        if (!player.attack(src, dst)) {
            this.output = { 'message': "Can't attack", 'is_error': true };
        }
        return this;
    };
    return AttackCommand;
}(ConsoleCommand));
exports.AttackCommand = AttackCommand;
var PrintCommand = /** @class */ (function (_super) {
    __extends(PrintCommand, _super);
    function PrintCommand(context) {
        return _super.call(this, "print", 1, "print") || this;
    }
    PrintCommand.prototype.execute = function (player) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (_super.prototype.execute.apply(this, __spreadArray([player], args, false)).output.is_error)
            return this;
        var args_length = args.length;
        switch (args_length) {
            case 2:
                if (args[0] == "move") {
                    (0, BoardVisualization_1.PrintPositions)(player.board, player.possibleMoves(math_1.Vector2D.from_str(args[1]), 1));
                }
                else if (args[0] == "attack") {
                    (0, BoardVisualization_1.PrintPositions)(player.board, player.possibleAttacks(math_1.Vector2D.from_str(args[1]), 1));
                }
                break;
            case 3:
                if (args[0] == "move") {
                    (0, BoardVisualization_1.PrintPositions)(player.board, player.possibleMoves(math_1.Vector2D.from_str(args[1]), Number(args[2])));
                }
                else if (args[0] == "attack") {
                    (0, BoardVisualization_1.PrintPositions)(player.board, player.possibleAttacks(math_1.Vector2D.from_str(args[1]), Number(args[2])));
                }
                break;
            case 1:
                if (args[0].includes(',')) {
                    var arg = args[0];
                    var src_2 = math_1.Vector2D.from_str(arg);
                    console.log(player.tile(src_2).toString());
                }
                else {
                    switch (args[0]) {
                        case 'health':
                            for (var _a = 0, _b = player.tiles.filter(function (tile) { return tile.object ? tile.object instanceof Pawn_1.Pawn : false; }); _a < _b.length; _a++) {
                                var tile = _b[_a];
                                console.log(tile.pos.toString() + " : " + tile.object.health.toString());
                            }
                            break;
                        default:
                            this.output = WRONG_ARGS_ERROR;
                    }
                }
                break;
        }
        return this;
    };
    return PrintCommand;
}(ConsoleCommand));
exports.PrintCommand = PrintCommand;
var SpawnCommand = /** @class */ (function (_super) {
    __extends(SpawnCommand, _super);
    function SpawnCommand(context) {
        var _this = _super.call(this, "spawn", 2, "spawn pawn pos") || this;
        _this.context = context;
        return _this;
    }
    SpawnCommand.prototype.execute = function (player) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (_super.prototype.execute.apply(this, __spreadArray([player], args, false)).output.is_error)
            return this;
        var type = args[0];
        var pos = math_1.Vector2D.from_str(args[1]);
        var color = args.length == 3 ? environments_1.Color[args[2]] : environments_1.Color.BLUE;
        switch (type) {
            case 'pawn':
            case 'p':
                this.context.tiles_manager.dev_addpawn(new Pawn_1.Pawn(pawn_template_json_1.default, color), pos);
                break;
            case 'item':
            case 'i':
                this.context.tiles_manager.dev_additem(new Item_1.Item(item_template_json_1.default, color), pos);
                break;
            case 'building':
            case 'b':
                this.context.tiles_manager.dev_addbuilding(new Building_1.Building(building_template_json_1.default, color), pos);
                break;
            default:
                this.output = { 'message': "Unknown type", 'is_error': true };
        }
        return this;
    };
    return SpawnCommand;
}(ConsoleCommand));
exports.SpawnCommand = SpawnCommand;
var QuitCommand = /** @class */ (function (_super) {
    __extends(QuitCommand, _super);
    function QuitCommand(context) {
        return _super.call(this, "quit", 0, "quit") || this;
    }
    QuitCommand.prototype.execute = function (player) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        process.exit(0);
        return this;
    };
    return QuitCommand;
}(ConsoleCommand));
exports.QuitCommand = QuitCommand;
var NewTurn = /** @class */ (function (_super) {
    __extends(NewTurn, _super);
    function NewTurn(context) {
        return _super.call(this, "newturn", 0, "newturn") || this;
    }
    NewTurn.prototype.execute = function (player) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        player.newTurn();
        return this;
    };
    return NewTurn;
}(ConsoleCommand));
exports.NewTurn = NewTurn;
//# sourceMappingURL=ConsoleCommands.js.map