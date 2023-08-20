"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Building = void 0;
var GameObject_1 = require("../GameObject");
var Building = /** @class */ (function (_super) {
    __extends(Building, _super);
    function Building(config, color) {
        var _this = _super.call(this, config, color) || this;
        _this.log_tag = "BUILDING";
        return _this;
    }
    //Engine
    Building.prototype.toString = function () {
        return "BUILDING()";
    };
    return Building;
}(GameObject_1.GameObject));
exports.Building = Building;
//# sourceMappingURL=Building.js.map