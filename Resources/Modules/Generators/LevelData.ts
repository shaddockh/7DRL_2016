import {GLM} from "gl-matrix";
import * as utils from "utils";

/**
 * Stored Level data for a level
 */
export default class LevelData {

    tiles: Array<Array<TileData>>;
    entities: Array<EntityData>;

    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.tiles = LevelData.createEmptyMap(width, height);
        this.entities = [];
    }

    inBounds(x: number, y: number): boolean {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    inBoundsPos(pos: Position2D|GLM.IArray): boolean {
        return pos[0] >= 0 && pos[0] < this.width && pos[1] >= 0 && pos[1] < this.height;
    }

    setTileTerrain(x: number, y: number, terrainType: TileType) {
        if (this.inBounds(x, y)) {
            this.tiles[x][y].terrainType = terrainType;
        }
    }

    getTile(x: number, y: number): TileData {
        if (this.inBounds(x, y)) {
            return this.tiles[x][y];
        }
        return null;
    }

    getTilePos(pos: Position2D|GLM.IArray): TileData {
        if (this.inBoundsPos(pos)) {
            return this.tiles[pos[0]][pos[1]];
        }
        return null;
    }

    getNeighborTiles(x: number, y: number, radius: number = 1): Array<TileData> {
        let neighbors: Array<TileData> = [];
        if (this.inBounds(x, y)) {
            for (let offsetX = 0 - radius; offsetX <= radius; offsetX++) {
                for (let offsetY = 0 - radius; offsetY <= radius; offsetY++) {
                    if (offsetX !== 0 && offsetY !== 0) {
                        if (this.inBounds(x + offsetX, y + offsetY)) {
                            neighbors.push(this.tiles[x + offsetX][y + offsetY]);
                        }

                    }

                }
            }
        }
        return neighbors;
    }

    isEntityAt(x: number, y: number): boolean {
        for (let i = 0, iEnd = this.entities.length; i < iEnd; i++) {
            let entity = this.entities[i];
            if (entity.x == x && entity.y == y) {
                return true;
            }
        }
        return false;
    }

    isEmpty(x: number, y: number): boolean {
        let tile = this.getTile(x, y);
        if (tile && tile.terrainType === TileType.floor) {
            return !this.isEntityAt(x, y);
        }
        return false;
    }

    getRandomEmptyPosition(): Position2D {
        let seek = true;
        while (seek) {
            let pos: Position2D = [utils.randomNumber(this.width), utils.randomNumber(this.height)];
            if (this.isEmpty(pos[0], pos[1])) {
                return pos;
            }
        }
    }

    /**
     * Iterates over the list of tiles calling the provided callback.  If the
     * callback returns true, then iteration is cancelled
     * @param  {TileData} callback
     * @return {[type]}
     */
    iterateTiles(callback: ListCallback<TileData>) {
        const tiles = this.tiles;
        for (let x = 0, xend = this.width; x < xend; x++) {
            for (let y = 0, yend = this.height; y < yend; y++) {
                if (callback(tiles[x][y])) {
                    return;
                }
            }
        }
    }

    /**
     * Iterates over the list of entities calling the provided callback.  If the
     * callback returns true, then iteration is cancelled
     * @param  {TileData} callback
     * @return {[type]}
     */
    iterateEntities(callback: ListCallback<EntityData>) {
        const entities = this.entities;
        for (let i = 0, iend = entities.length; i < iend; i++) {
            if (callback(entities[i])) {
                return;
            }
        }
    }

    iterateEntitiesAt(x: number, y: number, callback: ListCallback<EntityData>) {
        const entities = this.entities;
        for (let i = 0, iend = entities.length; i < iend; i++) {
            let entity = entities[i];
            if (entity.x == x && entity.y == y) {
                if (callback(entity)) {
                    return;
                }
            }
        }
    }

    iterateEntitiesAtPos(pos: Position2D| GLM.IArray, callback: ListCallback<EntityData>) {
        const entities = this.entities;
        for (let i = 0, iend = entities.length; i < iend; i++) {
            let entity = entities[i];
            if (entity.x == pos[0] && entity.y == pos[1]) {
                if (callback(entity)) {
                    return;
                }
            }
        }
    }

    addEntityAtPosition(x: number, y: number, entity: EntityData) {
        if (!entity.blueprint) {
            throw new Error(`Cannot add an entity without a blueprint. ${x},${y}`);
        }
        entity.x = x;
        entity.y = y;
        this.entities.push(entity);
    }

    removeEntity(entity: EntityData) {
        let idx = this.entities.indexOf(entity);
        if (idx > -1) {
            this.entities.splice(idx, 1);
        }
    }

    static createEmptyMap(width, height, defaultValue = {
        terrainType: TileType.none
    }) {
        let arr = [];
        for (let x = 0; x < width; x++) {
            // Create the nested array for the y values
            arr.push([]);
            // Add all the tiles
            for (let y = 0; y < height; y++) {

                //Note: we have to create a copy of the default value for each cell otherwise
                //changing one cell will update all the other cells
                let newTile: TileData = {
                    x: x,
                    y: y,
                    terrainType: defaultValue.terrainType
                };

                for (let p in defaultValue) {
                    newTile[p] = defaultValue[p];
                }
                arr[x].push(newTile);
            }
        }
        return arr;
    }
}
