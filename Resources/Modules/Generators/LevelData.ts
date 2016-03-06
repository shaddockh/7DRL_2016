
/**
 * Stored Level data for a level
 */
export default class LevelData {

    private tiles: Array<Array<Tile>>;


    constructor(private width: number, height: number) {
        this.tiles = LevelData.createEmptyMap(width, height);
    }

    setTile(x: number, y: number, terrainType: TileType) {
        this.tiles[x][y].terrainType = terrainType;
    }

    static createEmptyMap(width, height, defaultValue: Tile = {
        x: 0,
        y: 0,
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
                let newTile: Tile = {
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
