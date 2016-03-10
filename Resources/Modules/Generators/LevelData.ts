import {GLM} from "gl-matrix";
import * as utils from "utils";

export class EntityList extends utils.List<EntityData> {}

export class TileDataGrid extends utils.Grid<TileData> {}
/**
 * Stored Level data for a level
 */
export default class LevelData {

    tiles: TileDataGrid;
    entities: EntityList;

    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.tiles = new TileDataGrid(width, height, {
            x: 0,
            y: 0,
            terrainType: TileType.none
        });
        this.entities = new EntityList();
    }

    inBoundsPos(pos: Position2D|GLM.IArray): boolean {
        return this.tiles.inBounds(pos[0], pos[1]);
    }

    setTileTerrain(x: number, y: number, terrainType: TileType) {
        if (this.tiles.inBounds(x, y)) {
            this.tiles.getCell(x, y).terrainType = terrainType;
        }
    }

    getTile(x: number, y: number): TileData {
        return this.tiles.getCell(x, y);
    }

    getTilePos(pos: Position2D|GLM.IArray): TileData {
        return this.tiles.getCell(pos[0], pos[1]);
    }

    getNeighborTiles(x: number, y: number, radius: number = 1): Array<TileData> {
        let neighbors: Array<TileData> = [];
        if (this.tiles.inBounds(x, y)) {
            for (let offsetX = 0 - radius; offsetX <= radius; offsetX++) {
                for (let offsetY = 0 - radius; offsetY <= radius; offsetY++) {
                    if (offsetX !== 0 && offsetY !== 0) {
                        if (this.tiles.inBounds(x + offsetX, y + offsetY)) {
                            neighbors.push(this.tiles.getCell(x + offsetX, y + offsetY));
                        }
                    }
                }
            }
        }
        return neighbors;
    }

    isEntityAt(x: number, y: number): boolean {
        let found = false;
        this.entities.iterate((entity) => {
            if (entity.x == x && entity.y == y) {
                found = true;
                return true;
            }
        });
        return found;
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
        this.tiles.iterate(callback);
    }

    /**
     * Iterates over the list of entities calling the provided callback.  If the
     * callback returns true, then iteration is cancelled
     * @param  {TileData} callback
     * @return {[type]}
     */
    iterateEntities(callback: ListCallback<EntityData>) {
        this.entities.iterate(callback);
    }

    iterateEntitiesAt(x: number, y: number, callback: ListCallback<EntityData>) {
        this.entities.iterate((entity) => {
            if (entity.x == x && entity.y == y) {
                if (callback(entity)) {
                    return;
                }
            }
        });
    }

    iterateEntitiesAtPos(pos: Position2D| GLM.IArray, callback: ListCallback<EntityData>) {
        this.entities.iterate((entity) => {
            if (entity.x == pos[0] && entity.y == pos[1]) {
                if (callback(entity)) {
                    return;
                }
            }
        });
    }

    addEntityAtPosition(x: number, y: number, entity: EntityData) {
        if (this.tiles.inBounds(x, y)) {
            if (!entity.blueprint) {
                throw new Error(`Cannot add an entity without a blueprint. ${x},${y}`);
            }
            entity.x = x;
            entity.y = y;
            this.entities.add(entity);
        }
    }

    removeEntity(entity: EntityData): EntityData {
        return this.entities.remove(entity);
    }

}
