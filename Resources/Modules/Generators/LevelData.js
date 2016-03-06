"use strict";
/**
 * Stored Level data for a level
 */
var LevelData = (function () {
    function LevelData(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = LevelData.createEmptyMap(width, height);
    }
    LevelData.prototype.inBounds = function (x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    };
    LevelData.prototype.setTileTerrain = function (x, y, terrainType) {
        if (this.inBounds(x, y)) {
            this.tiles[x][y].terrainType = terrainType;
        }
    };
    LevelData.prototype.getTile = function (x, y) {
        if (this.inBounds(x, y)) {
            return this.tiles[x][y];
        }
        return null;
    };
    LevelData.prototype.getNeighborTiles = function (x, y, radius) {
        if (radius === void 0) { radius = 1; }
        var neighbors = [];
        if (this.inBounds(x, y)) {
            for (var offsetX = 0 - radius; offsetX <= radius; offsetX++) {
                for (var offsetY = 0 - radius; offsetY <= radius; offsetY++) {
                    if (offsetX !== 0 && offsetY !== 0) {
                        if (this.inBounds(x + offsetX, y + offsetY)) {
                            neighbors.push(this.tiles[x + offsetX][y + offsetY]);
                        }
                    }
                }
            }
        }
        return neighbors;
    };
    LevelData.prototype.iterate = function (callback) {
        var tiles = this.tiles;
        for (var x = 0, xend = this.width; x < xend; x++) {
            for (var y = 0, yend = this.height; y < yend; y++) {
                callback(tiles[x][y]);
            }
        }
    };
    LevelData.createEmptyMap = function (width, height, defaultValue) {
        if (defaultValue === void 0) { defaultValue = {
            terrainType: 0 /* none */
        }; }
        var arr = [];
        for (var x = 0; x < width; x++) {
            // Create the nested array for the y values
            arr.push([]);
            // Add all the tiles
            for (var y = 0; y < height; y++) {
                //Note: we have to create a copy of the default value for each cell otherwise
                //changing one cell will update all the other cells
                var newTile = {
                    x: x,
                    y: y,
                    terrainType: defaultValue.terrainType
                };
                for (var p in defaultValue) {
                    newTile[p] = defaultValue[p];
                }
                arr[x].push(newTile);
            }
        }
        return arr;
    };
    return LevelData;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LevelData;
