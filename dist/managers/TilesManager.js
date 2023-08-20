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
exports.TilesManager = void 0;
var tile_1 = require("../engine/tile");
var math_1 = require("../engine/math");
var TilesManager = /** @class */ (function () {
    function TilesManager(board, tiles) {
        this.tiles = [];
        this.board = board;
        this.config = board.config;
        if (tiles)
            this.tiles = tiles;
        else
            this.generate_tiles();
    }
    TilesManager.prototype.tile = function (pos) {
        if (!pos)
            throw new Error("pos is undefined");
        var index = this.to_index(pos);
        return this.tiles[index];
    };
    TilesManager.prototype.tileByIndex = function (index) {
        return this.tiles[index];
    };
    TilesManager.prototype.to_index = function (pos) {
        return (0, math_1.to_index)(pos, this.config.properties.width);
    };
    TilesManager.prototype.to_coord = function (index) {
        return (0, math_1.to_coord)(index, this.config.properties.width);
    };
    TilesManager.prototype.bresenhamLine = function (start, end) {
        var line = [];
        var dx = Math.abs(end.x - start.x);
        var dy = Math.abs(end.y - start.y);
        var sx = start.x < end.x ? 1 : -1;
        var sy = start.y < end.y ? 1 : -1;
        var err = dx - dy;
        while (true) {
            line.push(start.clone());
            if (start.x === end.x && start.y === end.y) {
                break;
            }
            var e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                start.x += sx;
            }
            if (e2 < dx) {
                err += dx;
                start.y += sy;
            }
        }
        return line;
    };
    TilesManager.prototype.is_case_visible_from = function (src, dst) {
        var _a, _b;
        for (var _i = 0, _c = this.bresenhamLine(src.clone(), dst); _i < _c.length; _i++) {
            var pos = _c[_i];
            if (pos.equals(src) || pos.equals(dst))
                continue;
            if (!((_b = (_a = this.tile(pos).object) === null || _a === void 0 ? void 0 : _a.is_transparent()) !== null && _b !== void 0 ? _b : true))
                return false;
        }
        return true;
    };
    TilesManager.prototype.objects = function (filter) {
        if (filter === void 0) { filter = undefined; }
        if (filter)
            return this.tiles.filter(function (tile) { return tile.has_object; }).map(function (tile) { return tile.object; }).filter(filter);
        else
            return this.tiles.filter(function (tile) { return tile.has_object; }).map(function (tile) { return tile.object; });
    };
    TilesManager.prototype.tiles_with_objects = function (filter) {
        if (filter === void 0) { filter = undefined; }
        if (filter)
            return this.tiles.filter(function (tile) { return tile.has_object; }).filter(function (tile) { return filter(tile.object); });
        else
            return this.tiles.filter(function (tile) { return tile.has_object; });
    };
    TilesManager.prototype.generate_tiles = function () {
        var size = this.config.properties.width * this.config.properties.height;
        for (var index = 0; index < size; index++) {
            this.tiles[index] = new tile_1.Tile(this.to_coord(index));
        }
    };
    TilesManager.prototype.possibleMoves = function (src, range, filter) {
        var _this = this;
        if (range === void 0) { range = 1; }
        if (filter === void 0) { filter = undefined; }
        if (range == 0)
            return [];
        var moves = this.board.possible_moves(src);
        var moves_filtered = !filter ? moves.filter(function (move) { var _a, _b; return (_b = (_a = _this.tile(move).object) === null || _a === void 0 ? void 0 : _a.can_pass_through(undefined)) !== null && _b !== void 0 ? _b : true; }) : moves.filter(filter);
        var moves_filtered_unique = moves_filtered.filter(function (move) { return !move.equals(src); });
        var moves_rec = moves_filtered_unique.flatMap(function (move) { return _this.possibleMoves(move, range - 1, filter); });
        return __spreadArray(__spreadArray([], moves_filtered_unique, true), moves_rec, true);
    };
    TilesManager.prototype.possibleAttacks = function (src, range) {
        var _this = this;
        if (range === void 0) { range = 1; }
        return this.possibleMoves(src, range, function (pos) { return true; }).filter(function (move) { var _a, _b; return _this.tile(move).has_object && ((_a = _this.tile(move).object) === null || _a === void 0 ? void 0 : _a.is_attackable((_b = _this.tile(src).object) !== null && _b !== void 0 ? _b : undefined)); });
    };
    TilesManager.prototype.visibleTiles = function (src, range) {
        var _this = this;
        if (range === void 0) { range = 1; }
        var potentials = this.board.possible_moves_range(src, range);
        return potentials.filter(function (pos) { return _this.is_case_visible_from(src, pos); });
    };
    TilesManager.prototype.canMove = function (src, dst) {
        var _a;
        return this.tile(src).canMove(dst) && this.tile(dst).canWalkOn((_a = this.tile(src).object) !== null && _a !== void 0 ? _a : undefined);
    };
    TilesManager.prototype.canAttack = function (src, dst) {
        return this.tile(src).canAttack(dst);
    };
    TilesManager.prototype.move = function (src, dst) {
        var _a;
        if (!this.canMove(src, dst))
            return false;
        var src_tile = this.tile(src);
        var dst_tile = this.tile(dst);
        src_tile.object.processMove();
        (_a = dst_tile.object) === null || _a === void 0 ? void 0 : _a.processIncomingObject(src_tile.object);
        dst_tile.object = src_tile.object;
        src_tile.object = undefined;
        return true;
    };
    TilesManager.prototype.attack = function (src, dst) {
        var _a, _b, _c, _d, _e, _f;
        if (!this.canAttack(src, dst))
            return false;
        var src_tile = this.tile(src);
        var dst_tile = this.tile(dst);
        (_a = dst_tile.object) === null || _a === void 0 ? void 0 : _a.processIncomingAttack(src_tile.object);
        (_b = src_tile.object) === null || _b === void 0 ? void 0 : _b.processIncomingDefense(dst_tile.object);
        if ((_c = dst_tile.object) === null || _c === void 0 ? void 0 : _c.is_dead()) {
            (_d = dst_tile.object) === null || _d === void 0 ? void 0 : _d.processDeath();
        }
        if ((_e = src_tile.object) === null || _e === void 0 ? void 0 : _e.is_dead()) {
            (_f = src_tile.object) === null || _f === void 0 ? void 0 : _f.processDeath();
        }
        return true;
    };
    TilesManager.prototype.dev_addpawn = function (pawn, pos) {
        var index = this.to_index(pos);
        this.tiles[index].object = pawn;
    };
    TilesManager.prototype.dev_additem = function (item, pos) {
        var index = this.to_index(pos);
        this.tiles[index].object = item;
    };
    TilesManager.prototype.dev_addbuilding = function (building, pos) {
        var index = this.to_index(pos);
        this.tiles[index].object = building;
    };
    return TilesManager;
}());
exports.TilesManager = TilesManager;
//# sourceMappingURL=TilesManager.js.map