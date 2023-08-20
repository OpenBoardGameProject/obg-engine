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
exports.ActionManager = void 0;
var logic_cond_1 = require("../engine/preconditionners/logic_cond");
var ActionManager = exports.ActionManager = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _move_decorators;
    var _attack_decorators;
    return _a = /** @class */ (function () {
            function ActionManager(game_manager) {
                this.log_tag = (__runInitializers(this, _instanceExtraInitializers), "ACTION_MANAGER");
                this.game_manager = game_manager;
                this.tiles_manager = this.game_manager.tiles_manager;
            }
            //ACTION
            ActionManager.prototype.move = function (src, dst) {
                return this.tiles_manager.move(src, dst);
            };
            ActionManager.prototype.attack = function (src, dst) {
                return this.tiles_manager.attack(src, dst);
            };
            ActionManager.prototype.nextTurn = function () {
                this.game_manager.next_turn();
                this.game_manager.tiles_manager.objects().forEach(function (obj) { return obj.processNewTurn(); });
            };
            return ActionManager;
        }()),
        (function () {
            _move_decorators = [logic_cond_1.CheckPawnColor];
            _attack_decorators = [logic_cond_1.CheckPawnColor];
            __esDecorate(_a, null, _move_decorators, { kind: "method", name: "move", static: false, private: false, access: { has: function (obj) { return "move" in obj; }, get: function (obj) { return obj.move; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _attack_decorators, { kind: "method", name: "attack", static: false, private: false, access: { has: function (obj) { return "attack" in obj; }, get: function (obj) { return obj.attack; } } }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
//# sourceMappingURL=ActionManager.js.map