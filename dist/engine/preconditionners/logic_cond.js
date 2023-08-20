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
exports.CheckObject = exports.HasBeenPlayed = exports.TriggerPlayed = exports.CheckTurn = exports.CheckVictory = exports.CheckPawnColor = void 0;
var Logger_1 = require("../../utils/Logger");
//GameInterface PRECOND
function CheckTurn(originalMethod, context) {
    function tmp() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.is_my_turn)
            return originalMethod.call.apply(originalMethod, __spreadArray([this], args, false));
        else {
            Logger_1.Logger.error(this, "Not your turn");
            return false;
        }
    }
    return tmp;
}
exports.CheckTurn = CheckTurn;
//GAME MANAGER PRECOND
function CheckObject(originalMethod, context) {
    function tmp(src) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.tiles_manager.tile(src).object)
            return originalMethod.call.apply(originalMethod, __spreadArray([this, src], args, false));
        else {
            Logger_1.Logger.error(this, "No object on tile");
            return false;
        }
    }
    return tmp;
}
exports.CheckObject = CheckObject;
function CheckPawnColor(originalMethod, context) {
    function tmp(src) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.current_turn == this.tiles_manager.tile(src).object.color)
            return originalMethod.call.apply(originalMethod, __spreadArray([this, src], args, false));
        else {
            Logger_1.Logger.error(this, "Not your color");
            return false;
        }
    }
    return tmp;
}
exports.CheckPawnColor = CheckPawnColor;
function CheckVictory(originalMethod, context) {
    function tmp() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = originalMethod.call.apply(originalMethod, __spreadArray([this], args, false));
        var color_victory = this.rule.check_victory(this);
        if (color_victory) {
            this.notify(function (observer) { return observer.onGameEnd ? observer.onGameEnd(color_victory) : null; });
        }
        return result;
    }
    return tmp;
}
exports.CheckVictory = CheckVictory;
//PAWN PRECOND
function TriggerPlayed(originalMethod, context) {
    function tmp() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (process.env.INFINITY_TURN)
            this.hasBeenPlayed = true;
        return originalMethod.call.apply(originalMethod, __spreadArray([this], args, false));
    }
    return tmp;
}
exports.TriggerPlayed = TriggerPlayed;
function HasBeenPlayed(originalMethod, context) {
    function tmp() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.hasBeenPlayed)
            return originalMethod.call.apply(originalMethod, __spreadArray([this], args, false));
        else {
            Logger_1.Logger.error(this, "Pawn has already been played");
            return false;
        }
    }
    return tmp;
}
exports.HasBeenPlayed = HasBeenPlayed;
//# sourceMappingURL=logic_cond.js.map