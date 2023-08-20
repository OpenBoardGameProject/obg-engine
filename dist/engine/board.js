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
exports.Board = void 0;
var math_1 = require("./math");
var environments_1 = require("./environments");
var math_2 = require("./math");
/**
 * Board class
 *
 * @class Board
 *
 * @property {BoardConfig} config
 * @description Deals with the board geometry
 *
 */
var Board = /** @class */ (function () {
    function Board(config) {
        this.config = config;
        this.current_adj_matrix_move = [];
        this.generate_adj_matrix_move();
        //Copy the matrix
        this.backup_matrix = Object.assign([], this.adj_matrix_move);
    }
    Object.defineProperty(Board.prototype, "adj_matrix_move", {
        get: function () {
            return this.current_adj_matrix_move;
        },
        enumerable: false,
        configurable: true
    });
    Board.prototype.to_index = function (pos) {
        return (0, math_1.to_index)(pos, this.config.properties.width);
    };
    Board.prototype.to_coord = function (index) {
        return (0, math_1.to_coord)(index, this.config.properties.width);
    };
    Board.prototype.cut_relations = function (cut_array) {
        var _this = this;
        //Check if it's the size of the board
        if (cut_array.length != this.config.properties.width && cut_array[0].length != this.config.properties.height) {
            throw new Error("Cut array is not the size of the board");
        }
        cut_array.forEach(function (row, x) {
            row.forEach(function (value, y) {
                if (value == 0) {
                    _this.restore_relations(new math_2.Vector2D(x, y));
                }
                else {
                    _this.cut_relation(new math_2.Vector2D(x, y));
                }
            });
        });
    };
    Board.prototype.cut_relation = function (pos) {
        var index = this.to_index(pos);
        var size = this.config.properties.width * this.config.properties.height;
        // Set all the column items at 0 (x=x , y=[0, height])
        for (var i = 0; i < size; i++) {
            this.adj_matrix_move[i][index] = 0;
        }
    };
    Board.prototype.restore_relations = function (pos) {
        var index = this.to_index(pos);
        var size = this.config.properties.width * this.config.properties.height;
        // Set all the column items at 0 (x=x , y=[0, height])
        for (var i = 0; i < size; i++) {
            this.adj_matrix_move[i][index] = this.backup_matrix[i][index];
        }
    };
    Board.prototype.generate_adj_matrix_move = function () {
        var size = this.config.properties.width * this.config.properties.height;
        var height = this.config.properties.height;
        var width = this.config.properties.width;
        var out_of_bound = function (index) { return index < 0 || index >= size; };
        for (var index = 0; index < size; index++) {
            this.adj_matrix_move[index] = [];
            var row = Math.floor(index / width);
            var col = index % width;
            for (var i = 0; i < size; i++) {
                var row_i = Math.floor(i / width);
                var col_i = i % width;
                if ((Math.abs(row - row_i) <= 1) &&
                    (Math.abs(col - col_i) <= 1) &&
                    (row !== row_i || col !== col_i) &&
                    !out_of_bound(i)) {
                    // Calculate direction based on the difference in rows and columns
                    var dir_row = row_i - row;
                    var dir_col = col_i - col;
                    var direction = void 0;
                    if (dir_row === -1) {
                        if (dir_col === -1)
                            direction = environments_1.Dir.NW;
                        else if (dir_col === 0)
                            direction = environments_1.Dir.N;
                        else
                            direction = environments_1.Dir.NE;
                    }
                    else if (dir_row === 0) {
                        if (dir_col === -1)
                            direction = environments_1.Dir.W;
                        else if (dir_col === 0)
                            direction = 0;
                        else
                            direction = environments_1.Dir.E;
                    }
                    else {
                        if (dir_col === -1)
                            direction = environments_1.Dir.SW;
                        else if (dir_col === 0)
                            direction = environments_1.Dir.S;
                        else
                            direction = environments_1.Dir.SE;
                    }
                    this.adj_matrix_move[index][i] = direction;
                }
                else {
                    this.adj_matrix_move[index][i] = 0;
                }
            }
        }
    };
    Board.prototype.possible_moves = function (pos) {
        var _this = this;
        var index = this.to_index(pos);
        return this.adj_matrix_move[index].map(function (dir, i) {
            if (dir != 0)
                return _this.to_coord(i);
            return null;
        }).filter(function (pos) { return pos != null; });
    };
    Board.prototype.possible_moves_range = function (pos, range) {
        var _this = this;
        if (range === void 0) { range = 1; }
        if (range == 0)
            return [];
        var moves = this.possible_moves(pos);
        var moves_filtered_unique = moves.filter(function (move) { return !move.equals(pos); });
        var moves_rec = moves_filtered_unique.flatMap(function (move) { return _this.possible_moves_range(move, range - 1); });
        var returned = __spreadArray(__spreadArray([], moves_filtered_unique, true), moves_rec, true);
        return returned;
    };
    return Board;
}());
exports.Board = Board;
//# sourceMappingURL=board.js.map