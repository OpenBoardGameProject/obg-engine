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
exports.Pawn = void 0;
var environments_1 = require("../engine/environments");
var Logger_1 = require("../utils/Logger");
var type_cond_1 = require("../engine/preconditionners/type_cond");
var config_1 = require("../engine/config");
var get_cond_1 = require("../engine/preconditionners/get_cond");
var Pawn = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _is_attackable_decorators;
    var _processIncomingAttack_decorators;
    var _processIncomingDefense_decorators;
    var _processDeath_decorators;
    return _a = /** @class */ (function () {
            function Pawn(config, color) {
                this.color = (__runInitializers(this, _instanceExtraInitializers), color);
                //Config
                this.log_tag = "PAWN";
                this.hasBeenPlayed = false;
                this.config = config;
                this._health = config.properties.health;
            }
            Object.defineProperty(Pawn.prototype, "health", {
                get: function () {
                    return this._health;
                },
                enumerable: false,
                configurable: true
            });
            Pawn.prototype.toRepr = function () {
                var _a;
                var item_str = this.item != undefined ? (_a = this.item) === null || _a === void 0 ? void 0 : _a.toRepr() : "";
                return this.config.apparence.str + item_str;
            };
            Pawn.prototype.toString = function () {
                var _a, _b;
                return "PAWN(C:".concat(environments_1.Color[this.color], ", H:").concat(this.health, ", P:").concat(this.hasBeenPlayed, ") : ").concat((_b = (_a = this.item) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "Empty");
            };
            Object.defineProperty(Pawn.prototype, "has_item", {
                //Game Logic
                get: function () {
                    return this.item != undefined;
                },
                enumerable: false,
                configurable: true
            });
            Pawn.prototype.is_walkable = function (incoming) {
                return false;
            };
            Pawn.prototype.is_attackable = function (incoming) {
                return incoming.color != this.color;
            };
            Pawn.prototype.can_pass_through = function (incoming) {
                return false;
            };
            Pawn.prototype.canMove = function (src, dst) {
                if (this.hasBeenPlayed) {
                    Logger_1.Logger.error(this, "Pawn has already been played");
                    return false;
                }
                var possible_moves = config_1.GAME_MANAGER.tiles_manager.possibleMoves(src, this.config.properties.move.range);
                return possible_moves.find(function (pos) { return pos.equals(dst); }) != undefined;
            };
            Pawn.prototype.canAttack = function (src, dst) {
                var _a, _b;
                if (this.hasBeenPlayed) {
                    Logger_1.Logger.error(this, "Pawn has already been played");
                    return false;
                }
                var possible_attacks = config_1.GAME_MANAGER.tiles_manager.possibleAttacks(src, (_b = (_a = this.item) === null || _a === void 0 ? void 0 : _a.config.properties.attack.range) !== null && _b !== void 0 ? _b : this.config.properties.attack.range);
                if (possible_attacks.find(function (pos) { return pos.equals(dst); }) != undefined)
                    return true;
                Logger_1.Logger.error(this, "No possible attacks");
                return false;
            };
            Pawn.prototype.is_dead = function () {
                return this.health <= 0;
            };
            //Action
            //PAWN
            Pawn.prototype.equip = function (item) {
                this.item = item;
            };
            Object.defineProperty(Pawn.prototype, "attack", {
                get: function () {
                    var _a, _b, _c, _d;
                    return (this.config.properties.attack.damage + ((_b = (_a = this.item) === null || _a === void 0 ? void 0 : _a.config.properties.attack.damage) !== null && _b !== void 0 ? _b : 0)) * ((_d = (_c = this.item) === null || _c === void 0 ? void 0 : _c.config.properties.attack.multiplier) !== null && _d !== void 0 ? _d : 1);
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(Pawn.prototype, "defense", {
                get: function () {
                    var _a, _b, _c, _d;
                    return (this.config.properties.defense.reduce + ((_b = (_a = this.item) === null || _a === void 0 ? void 0 : _a.config.properties.defense.reduce) !== null && _b !== void 0 ? _b : 0)) * ((_d = (_c = this.item) === null || _c === void 0 ? void 0 : _c.config.properties.defense.multiplier) !== null && _d !== void 0 ? _d : 1);
                },
                enumerable: false,
                configurable: true
            });
            //GAMEOBJECT
            Pawn.prototype.processIncomingObject = function (object) {
                return;
            };
            Pawn.prototype.processIncomingAttack = function (incoming) {
                this._health -= incoming.attack - this.defense;
                Logger_1.Logger.log(this, "Pawn has been attacked, health : " + this.health.toString());
            };
            Pawn.prototype.processIncomingDefense = function (object) {
                if (!process.env.INFINITY_TURN)
                    this.hasBeenPlayed = true;
            };
            Pawn.prototype.processDeath = function (current) {
                var _a;
                current.object = (_a = this.item) !== null && _a !== void 0 ? _a : null;
            };
            Pawn.prototype.processNewTurn = function () {
                this.hasBeenPlayed = false;
            };
            return Pawn;
        }()),
        (function () {
            _is_attackable_decorators = [type_cond_1.OnlyPawn];
            _processIncomingAttack_decorators = [type_cond_1.OnlyPawn];
            _processIncomingDefense_decorators = [type_cond_1.OnlyPawn];
            _processDeath_decorators = [get_cond_1.CurrentTile];
            __esDecorate(_a, null, _is_attackable_decorators, { kind: "method", name: "is_attackable", static: false, private: false, access: { has: function (obj) { return "is_attackable" in obj; }, get: function (obj) { return obj.is_attackable; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _processIncomingAttack_decorators, { kind: "method", name: "processIncomingAttack", static: false, private: false, access: { has: function (obj) { return "processIncomingAttack" in obj; }, get: function (obj) { return obj.processIncomingAttack; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _processIncomingDefense_decorators, { kind: "method", name: "processIncomingDefense", static: false, private: false, access: { has: function (obj) { return "processIncomingDefense" in obj; }, get: function (obj) { return obj.processIncomingDefense; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _processDeath_decorators, { kind: "method", name: "processDeath", static: false, private: false, access: { has: function (obj) { return "processDeath" in obj; }, get: function (obj) { return obj.processDeath; } } }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
exports.Pawn = Pawn;
//# sourceMappingURL=Pawn.js.map