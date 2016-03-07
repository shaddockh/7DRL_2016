declare module "Generators/LevelData" {
    /**
     * Stored Level data for a level
     */
    export default class LevelData {
        tiles: Array<Array<TileData>>;
        width: number;
        height: number;
        constructor(width: number, height: number);
        inBounds(x: any, y: any): boolean;
        setTileTerrain(x: number, y: number, terrainType: TileType): void;
        getTile(x: number, y: number): TileData;
        getNeighborTiles(x: number, y: number, radius?: number): Array<TileData>;
        iterate(callback: (tile: TileData) => void): void;
        static createEmptyMap(width: any, height: any, defaultValue?: {
            terrainType: TileType;
        }): any[];
    }
}

declare module "Generators/DefaultGenerator" {
    import LevelData from "Generators/LevelData";
    export default class DefaultGenerator {
        private width;
        private height;
        debug:boolean;
        constructor(width: number, height: number);
        generate(): LevelData;
    }
}
