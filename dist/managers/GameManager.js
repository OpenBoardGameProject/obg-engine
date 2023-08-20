"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
var environments_1 = require("../engine/environments");
var math_1 = require("../engine/math");
var board_1 = require("../engine/board");
var TilesManager_1 = require("./TilesManager");
var Logger_1 = require("../utils/Logger");
var Pawn_1 = require("../game_objects/base_objects/Pawn");
var pawn_template_json_1 = __importDefault(require("../config/pawn_template.json"));
var item_template_json_1 = __importDefault(require("../config/item_template.json"));
var building_template_json_1 = __importDefault(require("../config/building_template.json"));
var Item_1 = require("../game_objects/base_objects/Item");
var Building_1 = require("../game_objects/base_objects/Building");
var logic_cond_1 = require("../engine/preconditionners/logic_cond");
var GameManager = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _canMove_decorators;
    var _canAttack_decorators;
    var _move_decorators;
    var _attack_decorators;
    return _a = /** @class */ (function () {
            function GameManager(rule, boardConfig, tile_manager) {
                this.log_tag = (__runInitializers(this, _instanceExtraInitializers), "GAME_MANAGER");
                this.__observers = [];
                this.__current_turn = environments_1.Color.BLUE;
                this.__total_turns = 0;
                //Init Board
                this.__board = new board_1.Board(boardConfig);
                this.__rule = rule;
                if (tile_manager)
                    this.__tiles_manager = tile_manager;
                else
                    this.__tiles_manager = new TilesManager_1.TilesManager(this.board);
                this.tiles_manager.dev_addpawn(new Pawn_1.Pawn(pawn_template_json_1.default, environments_1.Color.BLUE), new math_1.Vector2D(3, 0));
                this.tiles_manager.dev_addpawn(new Pawn_1.Pawn(pawn_template_json_1.default, environments_1.Color.RED), new math_1.Vector2D(2, 0));
                this.tiles_manager.dev_additem(new Item_1.Item(item_template_json_1.default, environments_1.Color.WHITE), new math_1.Vector2D(1, 0));
                this.tiles_manager.dev_addbuilding(new Building_1.Building(building_template_json_1.default, environments_1.Color.WHITE), new math_1.Vector2D(0, 1));
                this.tiles_manager.dev_addbuilding(new Building_1.Building(building_template_json_1.default, environments_1.Color.WHITE), new math_1.Vector2D(1, 1));
                Logger_1.Logger.log(this, "Game Manager Initialized");
            }
            //LOGIC
            GameManager.prototype.canMove = function (src, dst) {
                //Check if there is a Pawn on src
                return this.tiles_manager.canMove(src, dst);
            };
            GameManager.prototype.canAttack = function (src, dst) {
                //Check if there is a Pawn on src
                return this.tiles_manager.canAttack(src, dst);
            };
            GameManager.prototype.start = function () {
                //changes
            };
            Object.defineProperty(GameManager.prototype, "board", {
                // Getter
                get: function () {
                    return this.__board;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(GameManager.prototype, "tiles_manager", {
                get: function () {
                    return this.__tiles_manager;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(GameManager.prototype, "current_turn", {
                get: function () {
                    return this.__current_turn;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(GameManager.prototype, "total_turns", {
                get: function () {
                    return this.__total_turns;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(GameManager.prototype, "rule", {
                get: function () {
                    return this.__rule;
                },
                enumerable: false,
                configurable: true
            });
            //ACTION
            GameManager.prototype.move = function (src, dst) {
                return this.tiles_manager.move(src, dst);
            };
            GameManager.prototype.attack = function (src, dst) {
                return this.tiles_manager.attack(src, dst);
            };
            GameManager.prototype.nextTurn = function () {
                this.__total_turns += 1;
                this.__current_turn = this.__current_turn == environments_1.Color.BLUE ? environments_1.Color.RED : environments_1.Color.BLUE;
                this.tiles_manager.objects().forEach(function (obj) { return obj.processNewTurn(); });
                return true;
            };
            //Event
            GameManager.prototype.subscribe = function (observer) {
                this.__observers.push(observer);
            };
            GameManager.prototype.unsubscribe = function (observer) {
                this.__observers = this.__observers.filter(function (evt) { return evt != observer; });
            };
            GameManager.prototype.notify = function (trigger) {
                this.__observers.forEach(function (observer) { return trigger(observer); });
            };
            return GameManager;
        }()),
        (function () {
            _canMove_decorators = [logic_cond_1.CheckObject];
            _canAttack_decorators = [logic_cond_1.CheckObject];
            _move_decorators = [logic_cond_1.CheckObject, logic_cond_1.CheckPawnColor];
            _attack_decorators = [logic_cond_1.CheckObject, logic_cond_1.CheckPawnColor];
            __esDecorate(_a, null, _canMove_decorators, { kind: "method", name: "canMove", static: false, private: false, access: { has: function (obj) { return "canMove" in obj; }, get: function (obj) { return obj.canMove; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _canAttack_decorators, { kind: "method", name: "canAttack", static: false, private: false, access: { has: function (obj) { return "canAttack" in obj; }, get: function (obj) { return obj.canAttack; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _move_decorators, { kind: "method", name: "move", static: false, private: false, access: { has: function (obj) { return "move" in obj; }, get: function (obj) { return obj.move; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _attack_decorators, { kind: "method", name: "attack", static: false, private: false, access: { has: function (obj) { return "attack" in obj; }, get: function (obj) { return obj.attack; } } }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
exports.GameManager = GameManager;
//# sourceMappingURL=GameManager.js.map