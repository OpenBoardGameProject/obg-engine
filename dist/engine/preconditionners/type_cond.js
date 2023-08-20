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
exports.OnlyPawn = void 0;
var Pawn_1 = require("../../game_objects/base_objects/Pawn");
function OnlyPawn(originalMethod, context) {
    function tmp(object) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (object instanceof Pawn_1.Pawn)
            return originalMethod.call.apply(originalMethod, __spreadArray([this, object], args, false));
        else
            return false;
    }
    return tmp;
}
exports.OnlyPawn = OnlyPawn;
//# sourceMappingURL=type_cond.js.map