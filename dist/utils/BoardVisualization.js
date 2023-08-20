"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintBoard = exports.PrintPositions = void 0;
function PrintPositions(board, pos, render) {
    if (render === void 0) { render = function (pos, is_pos) { return is_pos ? "[X]" : "[O]"; }; }
    //put some color in the console
    var colors = ["\x1b[31m", "\x1b[32m", "\x1b[33m", "\x1b[34m"];
    var reset = "\x1b[0m";
    var size = board.config.properties.width * board.config.properties.height;
    var width = board.config.properties.width;
    var height = board.config.properties.height;
    //print a board with the positions
    var filler = [];
    filler.length = size;
    filler.fill(0, 0, size);
    filler.map(function (_, i) {
        pos.forEach(function (p) {
            if (board.to_index(p) == i)
                filler[i] = 1;
        });
    });
    //print
    filler.map(function (_, i) {
        if (i % width == 0)
            process.stdout.write("\n");
        var color = colors[filler[i]];
        process.stdout.write(color + "".concat(render(board.to_coord(i), filler[i] == 1)) + reset);
    });
    process.stdout.write("\n");
}
exports.PrintPositions = PrintPositions;
function PrintBoard(tiles, board) {
    var size = board.config.properties.width * board.config.properties.height;
    var width = board.config.properties.width;
    var height = board.config.properties.height;
    //print a board with the positions
    var reset_code = "\x1b[0m";
    var color_code = [
        //white 
        "\x1b[37m",
        //red
        "\x1b[31m",
        //blue
        "\x1b[34m",
    ];
    var filler = [];
    filler.length = size;
    filler.fill(0, 0, size);
    filler = filler.map(function (_, i) {
        var tile = tiles[i];
        return (tile.has_object ? 1 : 0);
    });
    //print
    filler.map(function (x, i) {
        if (i % width == 0)
            process.stdout.write("\n");
        if (x === 1) {
            var tile = tiles[i];
            process.stdout.write("".concat(color_code[tile.object.color], "[").concat(tile.object.toRepr().padEnd(2, " "), "]").concat(reset_code));
        }
        else {
            process.stdout.write("[  ]");
        }
    });
    process.stdout.write("\n");
}
exports.PrintBoard = PrintBoard;
//# sourceMappingURL=BoardVisualization.js.map