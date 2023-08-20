"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var Logger = exports.Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.log = function (obj, message) {
        var tag = obj.log_tag ? "[".concat(obj.log_tag, "]") : "";
        process.stdout.write("".concat(Logger.colors.green).concat(tag, " ").concat(message, " ").concat(Logger.colors.reset, "\n"));
    };
    Logger.warn = function (obj, message) {
        var tag = obj.log_tag ? "[".concat(obj.log_tag, "]") : "";
        process.stdout.write("".concat(Logger.colors.yellow).concat(tag, " ").concat(message).concat(Logger.colors.reset, "\n"));
    };
    Logger.error = function (obj, message) {
        var tag = obj.log_tag ? "[".concat(obj.log_tag, "]") : "";
        process.stdout.write("".concat(Logger.colors.red).concat(tag, " ").concat(message).concat(Logger.colors.reset, "\n"));
    };
    Logger.colors = {
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        reset: "\x1b[0m"
    };
    return Logger;
}());
//# sourceMappingURL=Logger.js.map