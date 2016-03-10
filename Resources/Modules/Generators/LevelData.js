"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var utils = require("utils");
var EntityList = (function (_super) {
    __extends(EntityList, _super);
    function EntityList() {
        _super.apply(this, arguments);
    }
    return EntityList;
}(utils.List));
exports.EntityList = EntityList;
var TileDataGrid = (function (_super) {
    __extends(TileDataGrid, _super);
    function TileDataGrid() {
        _super.apply(this, arguments);
    }
    return TileDataGrid;
}(utils.Grid));
exports.TileDataGrid = TileDataGrid;
/**
 * Stored Level data for a level
 */
var LevelData = (function () {
    function LevelData(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = new TileDataGrid(width, height, {
            x: 0,
            y: 0,
            terrainType: 0 /* none */
        });
        this.entities = new EntityList();
    }
    LevelData.prototype.inBoundsPos = function (pos) {
        return this.tiles.inBounds(pos[0], pos[1]);
    };
    LevelData.prototype.setTileTerrain = function (x, y, terrainType) {
        if (this.tiles.inBounds(x, y)) {
            this.tiles.getCell(x, y).terrainType = terrainType;
        }
    };
    LevelData.prototype.getTile = function (x, y) {
        return this.tiles.getCell(x, y);
    };
    LevelData.prototype.getTilePos = function (pos) {
        return this.tiles.getCell(pos[0], pos[1]);
    };
    LevelData.prototype.getNeighborTiles = function (x, y, radius) {
        if (radius === void 0) { radius = 1; }
        var neighbors = [];
        if (this.tiles.inBounds(x, y)) {
            for (var offsetX = 0 - radius; offsetX <= radius; offsetX++) {
                for (var offsetY = 0 - radius; offsetY <= radius; offsetY++) {
                    if (offsetX !== 0 && offsetY !== 0) {
                        if (this.tiles.inBounds(x + offsetX, y + offsetY)) {
                            neighbors.push(this.tiles.getCell(x + offsetX, y + offsetY));
                        }
                    }
                }
            }
        }
        return neighbors;
    };
    LevelData.prototype.isEntityAt = function (x, y) {
        var found = false;
        this.entities.iterate(function (entity) {
            if (entity.x == x && entity.y == y) {
                found = true;
                return true;
            }
        });
        return found;
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
        this.tiles.iterate(callback);
    };
    /**
     * Iterates over the list of entities calling the provided callback.  If the
     * callback returns true, then iteration is cancelled
     * @param  {TileData} callback
     * @return {[type]}
     */
    LevelData.prototype.iterateEntities = function (callback) {
        this.entities.iterate(callback);
    };
    LevelData.prototype.iterateEntitiesAt = function (x, y, callback) {
        this.entities.iterate(function (entity) {
            if (entity.x == x && entity.y == y) {
                if (callback(entity)) {
                    return;
                }
            }
        });
    };
    LevelData.prototype.iterateEntitiesAtPos = function (pos, callback) {
        this.entities.iterate(function (entity) {
            if (entity.x == pos[0] && entity.y == pos[1]) {
                if (callback(entity)) {
                    return;
                }
            }
        });
    };
    LevelData.prototype.addEntityAtPosition = function (position, entity) {
        var x = position[0], y = position[1];
        if (this.tiles.inBounds(x, y)) {
            if (!entity.blueprint) {
                throw new Error("Cannot add an entity without a blueprint. " + x + "," + y);
            }
            entity.x = x;
            entity.y = y;
            this.entities.add(entity);
        }
    };
    LevelData.prototype.addEntityBlueprintAtPosition = function (position, blueprint) {
        this.addEntityAtPosition(position, {
            x: 0,
            y: 0,
            blueprint: blueprint
        });
    };
    LevelData.prototype.removeEntity = function (entity) {
        return this.entities.remove(entity);
    };
    return LevelData;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LevelData;
