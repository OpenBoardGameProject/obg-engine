"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to_coord = exports.to_index = exports.Vector2D = void 0;
var Vector2D = /** @class */ (function () {
    function Vector2D(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2D.prototype.add = function (other) {
        return new Vector2D(this.x + other.x, this.y + other.y);
    };
    Vector2D.prototype.toString = function () {
        return "(".concat(this.x, ", ").concat(this.y, ")");
    };
    Vector2D.prototype.equals = function (other) {
        return this.x == other.x && this.y == other.y;
    };
    Vector2D.prototype.clone = function () {
        return new Vector2D(this.x, this.y);
    };
    Vector2D.from_str = function (str) {
        str = str.replace('(', '').replace(')', '');
        var _a = str.split(',').map(function (x) { return parseInt(x); }), x = _a[0], y = _a[1];
        return new Vector2D(x, y);
    };
    return Vector2D;
}());
exports.Vector2D = Vector2D;
function to_index(pos, width) {
    return pos.y * width + pos.x;
}
exports.to_index = to_index;
function to_coord(index, width) {
    return new Vector2D(index % width, Math.floor(index / width));
}
exports.to_coord = to_coord;
//# sourceMappingURL=math.js.map