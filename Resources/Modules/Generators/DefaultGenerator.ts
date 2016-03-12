import * as ROT from "rot";
import LevelData from "./LevelData";

export default class DefaultGenerator {

    constructor(private width: number, private height: number, private debug) {
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
                if (tile) {
                    if (value) {
                        tile.terrainType = TileType.none;
                    } else {
                        tile.terrainType = TileType.floor;
                        tile.blueprint = "tile_floor_generic";
                    }
                } else {
                    this.DEBUG(`assiging to tile out of bounds: ${x},${y}`);
                }
            });

            this.generateWalls(levelData);

            this.generateCreatures(levelData);

            let playerPos = levelData.getRandomEmptyPosition();
            levelData.addEntityBlueprintAtPosition(playerPos, "hero");

            return levelData;
        } finally {
            this.DEBUG(`Generation complete after ${new Date().getTime() - start} ms`);
        }
    }

    generateWalls(levelData: LevelData) {
        this.DEBUG("Generating walls");
        levelData.iterateTiles((tile: TileData) => {
            if (tile.terrainType == TileType.floor) {
                levelData.getNeighborTiles(tile.x, tile.y).forEach((tile) => {
                    if (tile.terrainType == TileType.none) {
                        tile.terrainType = TileType.wall;
                        tile.blueprint = "tile_wall_generic";
                    }
                });
            }
        });
    }

    generateCreatures(levelData: LevelData) {
        this.DEBUG("Generating creatures");
        for (let i = 0; i < 10; i++) {
            let spawnPos = levelData.getRandomEmptyPosition();
            levelData.addEntityBlueprintAtPosition(spawnPos, "lost_soul");
        }
    }

    DEBUG(message: string) {
        if (this.debug) {
            console.log("Default Generator: " + message);
        }
    }
}
