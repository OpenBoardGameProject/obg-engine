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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameInterface = void 0;
var math_1 = require("../engine/math");
var logic_cond_1 = require("../engine/preconditionners/logic_cond");
var tile_1 = require("../engine/tile");
var EMPTY_TILE = new tile_1.Tile(new math_1.Vector2D(-1, -1), null);
var GameInterface = exports.GameInterface = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _move_decorators;
    var _attack_decorators;
    var _newTurn_decorators;
    return _a = /** @class */ (function () {
            function GameInterface(game, player) {
                this.log_tag = (__runInitializers(this, _instanceExtraInitializers), "GAME_INTERFACE");
                this.__game = game;
                this.__player = player;
            }
            Object.defineProperty(GameInterface.prototype, "is_my_turn", {
                //Getters
                get: function () {
                    return this.__game.current_turn == this.__player.color;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(GameInterface.prototype, "board", {
                get: function () {
                    return this.__game.board;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(GameInterface.prototype, "player", {
                get: function () {
                    return this.__player;
                },
                enumerable: false,
                configurable: true
            });
            //Public interface
            GameInterface.prototype.canMove = function (src, dst) {
                return this.__game.canMove(src, dst);
            };
            GameInterface.prototype.canAttack = function (src, dst) {
                return this.__game.canAttack(src, dst);
            };
            GameInterface.prototype.possibleMoves = function (src, range) {
                if (range === void 0) { range = 1; }
                return this.__game.tiles_manager.possibleMoves(src);
            };
            GameInterface.prototype.possibleAttacks = function (src, range) {
                if (range === void 0) { range = 1; }
                return this.__game.tiles_manager.possibleAttacks(src);
            };
            Object.defineProperty(GameInterface.prototype, "tiles", {
                get: function () {
                    var _this = this;
                    var width = this.__game.board.config.properties.width;
                    var height = this.__game.board.config.properties.height;
                    var size = width * height;
                    var our_objects = this.__game.tiles_manager.tiles.filter(function (tile) { var _a; return ((_a = tile.object) === null || _a === void 0 ? void 0 : _a.color) == _this.__player.color; });
                    var visibleTiles = our_objects.flatMap(function (tile) { var _a, _b; return _this.__game.tiles_manager.visibleTiles(tile.pos, (_b = (_a = tile.object) === null || _a === void 0 ? void 0 : _a.config.properties.vision.range) !== null && _b !== void 0 ? _b : 0); });
                    var tiles = [];
                    tiles.length = size;
                    tiles = tiles.fill(EMPTY_TILE, 0, width * this.__game.board.config.properties.height);
                    our_objects.forEach(function (tile) {
                        tiles[(0, math_1.to_index)(tile.pos, width)] = tile;
                    });
                    visibleTiles.forEach(function (pos) {
                        tiles[(0, math_1.to_index)(pos, width)] = _this.__game.tiles_manager.tile(pos);
                    });
                    //Verify that all tiles are filled and not undefined
                    tiles.forEach(function (tile) {
                        if (tile == undefined) {
                            throw new Error("Tile is undefined");
                        }
                    });
                    if (tiles.length != size) {
                        throw new Error("Tiles array is not the right size");
                    }
                    return tiles;
                },
                enumerable: false,
                configurable: true
            });
            GameInterface.prototype.tile = function (pos) {
                return this.tiles[(0, math_1.to_index)(pos, this.__game.board.config.properties.width)];
            };
            GameInterface.prototype.move = function (src, dst) {
                return this.__game.move(src, dst);
            };
            GameInterface.prototype.attack = function (src, dst) {
                return this.__game.attack(src, dst);
            };
            GameInterface.prototype.newTurn = function () {
                return this.__game.nextTurn();
            };
            return GameInterface;
        }()),
        (function () {
            _move_decorators = [logic_cond_1.CheckTurn];
            _attack_decorators = [logic_cond_1.CheckTurn];
            _newTurn_decorators = [logic_cond_1.CheckTurn];
            __esDecorate(_a, null, _move_decorators, { kind: "method", name: "move", static: false, private: false, access: { has: function (obj) { return "move" in obj; }, get: function (obj) { return obj.move; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _attack_decorators, { kind: "method", name: "attack", static: false, private: false, access: { has: function (obj) { return "attack" in obj; }, get: function (obj) { return obj.attack; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _newTurn_decorators, { kind: "method", name: "newTurn", static: false, private: false, access: { has: function (obj) { return "newTurn" in obj; }, get: function (obj) { return obj.newTurn; } } }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
//# sourceMappingURL=GameInterface.js.map