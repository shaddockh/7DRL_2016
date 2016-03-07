
/**
 * Stored Level data for a level
 */
export default class LevelData {

    tiles: Array<Array<TileData>>;

    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.tiles = LevelData.createEmptyMap(width, height);
    }

    inBounds(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
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

    iterate(callback: (tile: TileData) => void) {
        const tiles = this.tiles;
        for (let x = 0, xend = this.width; x < xend; x++) {
            for (let y = 0, yend = this.height; y < yend; y++) {
                callback(tiles[x][y]);
            }
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
