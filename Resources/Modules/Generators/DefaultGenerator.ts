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
                if (value) {
                    return;
                } /* do not store walls */
                levelData.setTile(x, y, TileType.floor);
            });

            return levelData;
        } finally {
            this.DEBUG(`Generation complete after ${new Date().getTime() - start} ms`);
        }
    }

    DEBUG(message: string) {
        if (this.debug) {
            console.log("Default Generator: " + message);
        }
    }
}
