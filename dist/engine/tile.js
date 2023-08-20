"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
var Tile = /** @class */ (function () {
    function Tile(pos, object) {
        if (object === void 0) { object = null; }
        this.pos = pos;
        this.object = object;
    }
    Object.defineProperty(Tile.prototype, "has_object", {
        get: function () {
            return this.object != null;
        },
        enumerable: false,
        configurable: true
    });
    Tile.prototype.canMove = function (dst) {
        var _a, _b;
        return (_b = (_a = this.object) === null || _a === void 0 ? void 0 : _a.canMove(this.pos, dst)) !== null && _b !== void 0 ? _b : false;
    };
    Tile.prototype.canAttack = function (dst) {
        var _a, _b;
        return (_b = (_a = this.object) === null || _a === void 0 ? void 0 : _a.canAttack(this.pos, dst)) !== null && _b !== void 0 ? _b : false;
    };
    Tile.prototype.canWalkOn = function (incoming) {
        var _a, _b;
        return (_b = (_a = this.object) === null || _a === void 0 ? void 0 : _a.is_walkable(incoming)) !== null && _b !== void 0 ? _b : true;
    };
    Tile.prototype.toString = function () {
        var _a, _b;
        return "Tile(".concat(this.pos.x, ", ").concat(this.pos.y, ") : ").concat((_b = (_a = this.object) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "Empty");
    };
    return Tile;
}());
exports.Tile = Tile;
//# sourceMappingURL=tile.js.map