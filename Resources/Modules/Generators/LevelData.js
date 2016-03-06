"use strict";
/**
 * Stored Level data for a level
 */
var LevelData = (function () {
    function LevelData(width, height) {
        this.width = width;
        this.tiles = LevelData.createEmptyMap(width, height);
    }
    LevelData.prototype.setTile = function (x, y, terrainType) {
        this.tiles[x][y].terrainType = terrainType;
    };
    LevelData.createEmptyMap = function (width, height, defaultValue) {
        if (defaultValue === void 0) { defaultValue = {
            x: 0,
            y: 0,
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
