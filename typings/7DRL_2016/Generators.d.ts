declare module "Generators/LevelData" {
    /**
     * Stored Level data for a level
     */
    export default class LevelData {
        width:number;
        height:number;
        tiles:Array<Array<Tile>>;
        constructor(width: number, height: number);
        setTile(x: number, y: number, terrainType: TileType): void;
        static createEmptyMap(width: any, height: any, defaultValue?: Tile): any[];
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
