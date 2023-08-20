"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Building = void 0;
var Building = /** @class */ (function () {
    function Building(config, color) {
        //Engine
        this.log_tag = "BUILDING";
        this.config = config;
        this.color = color;
    }
    Building.prototype.toString = function () {
        return "BUILDING()";
    };
    Building.prototype.toRepr = function () {
        return this.config.apparence.str;
    };
    //Game Logic
    Building.prototype.can_pass_through = function (incoming) {
        return false;
    };
    Building.prototype.is_walkable = function (incoming) {
        return false;
    };
    Building.prototype.canMove = function (src, dst) {
        return false;
    };
    Building.prototype.canAttack = function (src, dst) {
        return false;
    };
    Building.prototype.is_attackable = function (incoming) {
        return false;
    };
    Building.prototype.is_dead = function () {
        return false;
    };
    //Action
    Building.prototype.processIncomingObject = function (object) {
        return;
    };
    Building.prototype.processIncomingAttack = function (object) {
        return;
    };
    Building.prototype.processIncomingDefense = function (object) {
        return;
    };
    Building.prototype.processDeath = function () {
        return;
    };
    Building.prototype.processNewTurn = function () {
        return;
    };
    return Building;
}());
exports.Building = Building;
//# sourceMappingURL=Building.js.map