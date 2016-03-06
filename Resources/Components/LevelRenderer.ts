"atomic component";
import CustomJSComponent from "CustomJSComponent";
import * as PubSub from "pubsub-js";
import LevelData from "Generators/LevelData";

class LevelRenderer extends CustomJSComponent {

    inspectorFields = {
        debug: false,
    };

    private cellUnitSize: number;
    private cellPixelSize: number = 16;

    levelData: LevelData = null;
    children: Array<any> = [];

    constructor() {
        super();
        this.cellUnitSize = this.cellPixelSize * Atomic.PIXEL_SIZE;
        PubSub.subscribe("game.level.load", (message: string, data: any) => {
            this.loadLevel(data.level);
        });
    }

    loadLevel(level: LevelData) {
        this.levelData = level;
        this.render();
    }

    render() {
        let start = new Date().getTime();
        try {
            let scale = this.cellPixelSize * Atomic.PIXEL_SIZE,
                offsetX = this.levelData.width / 2 * scale * -1,
                offsetY = this.levelData.height / 2 * scale * -1;

            this.levelData.tiles.forEach((cols: Array<Tile>) => {
                cols.forEach((tile: Tile) => {
                    if (tile.terrainType !== TileType.none) {
                        this.DEBUG(`Construction cell [${tile.x},${tile.y}] - ${tile.blueprint}`);
                        const tileNode = this.node.createChildPrefab(tile.x + "-" + tile.y, "Prefabs/Tiles/FloorTile.prefab");
                        tileNode.position2D = [tile.x * scale, tile.y * scale];
                        //let tileNode = nodeBuilder.createChildAtPosition(this.node, tile.blueprint, [tile.x * scale, tile.y * scale]);
                        // let tileComponent = tileNode.getJSComponent<Tile>("Tile");
                        // if (tileComponent) {
                        //     tileComponent.setMapReference(tile);
                        // }
                        this.children.push(tileNode);
                    }

                });
            });
            this.node.position2D = [offsetX, offsetY];
        } finally {
            this.DEBUG(`Rendering complete after ${new Date().getTime() - start} ms`);
        }
    }
}

export = LevelRenderer;
