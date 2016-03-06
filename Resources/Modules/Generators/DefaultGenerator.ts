import * as ROT from "rot";
import LevelData from "./LevelData";

export default class DefaultGenerator {

    debug = false;

    constructor(private width: number, private height: number) {
        // constructs
    }

    generate(): LevelData {
        let start = new Date().getTime();
        try {
            this.DEBUG(`creating map: ${this.width} x ${this.height}`);
            const levelData = new LevelData(this.width, this.height);
            const builder = new ROT.Map.Uniform(this.width, this.height, this);
            builder.create((x, y, value) => {
                const tile = levelData.getTile(x, y);
                if (value) {
                    tile.terrainType = TileType.none;
                } else {
                    tile.terrainType = TileType.floor;
                }
            });

            this.generateWalls(levelData);

            return levelData;
        } finally {
            this.DEBUG(`Generation complete after ${new Date().getTime() - start} ms`);
        }
    }

    generateWalls(levelData: LevelData) {
        levelData.iterate((tile: Tile) => {
            if (tile.terrainType == TileType.floor) {
                levelData.getNeighborTiles(tile.x, tile.y).forEach((tile) => {
                    if (tile.terrainType == TileType.none) {
                        tile.terrainType = TileType.wall;
                    }
                });
            }
        });
    }

    DEBUG(message: string) {
        if (this.debug) {
            console.log("Default Generator: " + message);
        }
    }
}
