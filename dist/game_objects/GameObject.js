"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameObject = void 0;
var GameObject = /** @class */ (function () {
    function GameObject(config, color) {
        this.log_tag = "GAMEOBJECT";
        this.config = config;
        this.color = color;
    }
    //INTERNAL
    GameObject.prototype.toString = function () {
        return "GAMEOBJECT()";
    };
    GameObject.prototype.toRepr = function () {
        return this.config.apparence.str;
    };
    //Game Logic
    GameObject.prototype.can_pass_through = function (incoming) {
        return this.config.properties.can_pass_through;
    };
    GameObject.prototype.is_walkable = function (incoming) {
        return this.config.properties.is_walkable;
    };
    GameObject.prototype.canMove = function (src, dst) {
        return this.config.properties.can_move;
    };
    GameObject.prototype.canAttack = function (src, dst) {
        return this.config.properties.can_attack;
    };
    GameObject.prototype.is_attackable = function (incoming) {
        return this.config.properties.is_attackable;
    };
    GameObject.prototype.is_dead = function (tile) {
        return false;
    };
    GameObject.prototype.is_transparent = function () {
        return this.config.properties.is_transparent;
    };
    //Action
    GameObject.prototype.processIncomingObject = function (object) { };
    GameObject.prototype.processMove = function () { };
    GameObject.prototype.processIncomingAttack = function (object) { };
    GameObject.prototype.processIncomingDefense = function (object) { };
    GameObject.prototype.processDeath = function () { };
    GameObject.prototype.processNewTurn = function () { };
    return GameObject;
}());
exports.GameObject = GameObject;
//# sourceMappingURL=GameObject.js.map