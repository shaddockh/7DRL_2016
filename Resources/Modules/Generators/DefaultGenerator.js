"use strict";
var ROT = require("rot");
var LevelData_1 = require("./LevelData");
var DefaultGenerator = (function () {
    function DefaultGenerator(width, height) {
        this.width = width;
        this.height = height;
        this.debug = false;
        // constructs
    }
    DefaultGenerator.prototype.generate = function () {
        var start = new Date().getTime();
        try {
            this.DEBUG("creating map: " + this.width + " x " + this.height);
            var levelData_1 = new LevelData_1.default(this.width, this.height);
            var builder = new ROT.Map.Uniform(this.width, this.height, this);
            builder.create(function (x, y, value) {
                if (value) {
                    return;
                } /* do not store walls */
                levelData_1.setTile(x, y, 1 /* floor */);
            });
            return levelData_1;
        }
        finally {
            this.DEBUG("Generation complete after " + (new Date().getTime() - start) + " ms");
        }
    };
    DefaultGenerator.prototype.DEBUG = function (message) {
        if (this.debug) {
            console.log("Default Generator: " + message);
        }
    };
    return DefaultGenerator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DefaultGenerator;
