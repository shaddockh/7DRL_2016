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
                var tile = levelData_1.getTile(x, y);
                if (value) {
                    tile.terrainType = 0 /* none */;
                }
                else {
                    tile.terrainType = 1 /* floor */;
                }
            });
            this.generateWalls(levelData_1);
            return levelData_1;
        }
        finally {
            this.DEBUG("Generation complete after " + (new Date().getTime() - start) + " ms");
        }
    };
    DefaultGenerator.prototype.generateWalls = function (levelData) {
        levelData.iterate(function (tile) {
            if (tile.terrainType == 1 /* floor */) {
                levelData.getNeighborTiles(tile.x, tile.y).forEach(function (tile) {
                    if (tile.terrainType == 0 /* none */) {
                        tile.terrainType = 2 /* wall */;
                    }
                });
            }
        });
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
