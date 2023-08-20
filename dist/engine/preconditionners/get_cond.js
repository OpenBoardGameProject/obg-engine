"use strict";
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
exports.CurrentTile = void 0;
var config_1 = require("../config");
function CurrentTile(originalMethod, context) {
    function tmp() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Find the tile where the object is
        var object_tile = config_1.GAME_MANAGER.tiles_manager.tiles_with_objects(function (obj) { return obj == _this; });
        if (object_tile.length == 0)
            throw new Error("Object not found");
        return originalMethod.call.apply(originalMethod, __spreadArray([this, object_tile[0]], args, false));
    }
    return tmp;
}
exports.CurrentTile = CurrentTile;
//# sourceMappingURL=get_cond.js.map