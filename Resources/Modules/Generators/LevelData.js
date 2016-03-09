"use strict";
var utils = require("utils");
/**
 * Stored Level data for a level
 */
var LevelData = (function () {
    function LevelData(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = LevelData.createEmptyMap(width, height);
        this.entities = [];
    }
    LevelData.prototype.inBounds = function (x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    };
    LevelData.prototype.inBoundsPos = function (pos) {
        return pos[0] >= 0 && pos[0] < this.width && pos[1] >= 0 && pos[1] < this.height;
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
    LevelData.prototype.getTilePos = function (pos) {
        if (this.inBoundsPos(pos)) {
            return this.tiles[pos[0]][pos[1]];
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
    LevelData.prototype.isEntityAt = function (x, y) {
        for (var i = 0, iEnd = this.entities.length; i < iEnd; i++) {
            var entity = this.entities[i];
            if (entity.x == x && entity.y == y) {
                return true;
            }
        }
        return false;
    };
    LevelData.prototype.isEmpty = function (x, y) {
        var tile = this.getTile(x, y);
        if (tile && tile.terrainType === 1 /* floor */) {
            return !this.isEntityAt(x, y);
        }
        return false;
    };
    LevelData.prototype.getRandomEmptyPosition = function () {
        var seek = true;
        while (seek) {
            var pos = [utils.randomNumber(this.width), utils.randomNumber(this.height)];
            if (this.isEmpty(pos[0], pos[1])) {
                return pos;
            }
        }
    };
    /**
     * Iterates over the list of tiles calling the provided callback.  If the
     * callback returns true, then iteration is cancelled
     * @param  {TileData} callback
     * @return {[type]}
     */
    LevelData.prototype.iterateTiles = function (callback) {
        var tiles = this.tiles;
        for (var x = 0, xend = this.width; x < xend; x++) {
            for (var y = 0, yend = this.height; y < yend; y++) {
                if (callback(tiles[x][y])) {
                    return;
                }
            }
        }
    };
    /**
     * Iterates over the list of entities calling the provided callback.  If the
     * callback returns true, then iteration is cancelled
     * @param  {TileData} callback
     * @return {[type]}
     */
    LevelData.prototype.iterateEntities = function (callback) {
        var entities = this.entities;
        for (var i = 0, iend = entities.length; i < iend; i++) {
            if (callback(entities[i])) {
                return;
            }
        }
    };
    LevelData.prototype.iterateEntitiesAt = function (x, y, callback) {
        var entities = this.entities;
        for (var i = 0, iend = entities.length; i < iend; i++) {
            var entity = entities[i];
            if (entity.x == x && entity.y == y) {
                if (callback(entity)) {
                    return;
                }
            }
        }
    };
    LevelData.prototype.iterateEntitiesAtPos = function (pos, callback) {
        var entities = this.entities;
        for (var i = 0, iend = entities.length; i < iend; i++) {
            var entity = entities[i];
            if (entity.x == pos[0] && entity.y == pos[1]) {
                if (callback(entity)) {
                    return;
                }
            }
        }
    };
    LevelData.prototype.addEntityAtPosition = function (x, y, entity) {
        if (!entity.blueprint) {
            throw new Error("Cannot add an entity without a blueprint. " + x + "," + y);
        }
        entity.x = x;
        entity.y = y;
        this.entities.push(entity);
    };
    LevelData.prototype.removeEntity = function (entity) {
        var idx = this.entities.indexOf(entity);
        if (idx > -1) {
            this.entities.splice(idx, 1);
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
