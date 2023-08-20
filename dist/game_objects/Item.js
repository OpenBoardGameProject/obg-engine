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
exports.Item = void 0;
var type_cond_1 = require("../engine/preconditionners/type_cond");
var Item = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _is_walkable_decorators;
    var _processIncomingObject_decorators;
    return _a = /** @class */ (function () {
            function Item(config, color) {
                this.color = (__runInitializers(this, _instanceExtraInitializers), color);
                this.log_tag = "ITEM";
                this.config = config;
            }
            Item.prototype.toString = function () {
                return "ITEM()";
            };
            //Game Logic
            Item.prototype.can_pass_through = function (incoming) {
                return true;
            };
            Item.prototype.toRepr = function () {
                return this.config.apparence.str;
            };
            Item.prototype.canMove = function () {
                return false;
            };
            Item.prototype.canAttack = function (src, dst) {
                return false;
            };
            Item.prototype.is_walkable = function (incoming) {
                return !incoming.has_item;
            };
            Item.prototype.is_attackable = function (incoming) {
                return false;
            };
            Item.prototype.is_dead = function () {
                return false;
            };
            //Action
            Item.prototype.processIncomingObject = function (object) {
                object.equip(this);
            };
            Item.prototype.processIncomingAttack = function (object) {
                return;
            };
            Item.prototype.processIncomingDefense = function (object) {
                return;
            };
            Item.prototype.processDeath = function () {
                return;
            };
            Item.prototype.processNewTurn = function () {
                return;
            };
            return Item;
        }()),
        (function () {
            _is_walkable_decorators = [type_cond_1.OnlyPawn];
            _processIncomingObject_decorators = [type_cond_1.OnlyPawn];
            __esDecorate(_a, null, _is_walkable_decorators, { kind: "method", name: "is_walkable", static: false, private: false, access: { has: function (obj) { return "is_walkable" in obj; }, get: function (obj) { return obj.is_walkable; } } }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _processIncomingObject_decorators, { kind: "method", name: "processIncomingObject", static: false, private: false, access: { has: function (obj) { return "processIncomingObject" in obj; }, get: function (obj) { return obj.processIncomingObject; } } }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
exports.Item = Item;
//# sourceMappingURL=Item.js.map