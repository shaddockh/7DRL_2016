"atomic component";
import CustomJSComponent from "CustomJSComponent";
import * as PubSub from "pubsub-js";
import LevelData from "Generators/LevelData";
import {BroadcastEvents} from "Constants";
import {nodeBuilder} from "atomic-blueprintLib";
import GameController from "GameController";

// JSComponents are defined non-standard so we need to import them appropriately
import Tile = require("./common/Tile");
import Entity = require("./common/Entity");

class LevelRenderer extends CustomJSComponent {

    inspectorFields = {
        debug: false,
    };

    private cellUnitSize: number;
    private cellPixelSize: number = 16;

    levelData: LevelData = null;
    children: Array<Atomic.Node> = [];

    constructor() {
        super();
        this.cellUnitSize = this.cellPixelSize * Atomic.PIXEL_SIZE;
    }

    start() {
        PubSub.subscribe(BroadcastEvents.gameLevelLoad, (message: string, data: any) => {
            this.DEBUG("Got a load level message");
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

            this.levelData.iterateTiles((tile) => {
                if (tile.terrainType !== TileType.none) {
                    //this.DEBUG(`Construction cell [${tile.x},${tile.y}] - ${tile.blueprint}`);
                    const tileNode = nodeBuilder.createChildAtPosition(this.node, tile.blueprint, [tile.x * scale, tile.y * scale]);
                    const tileComponent = this.getJSComponent<Tile>("Tile");
                    if (tileComponent) {
                        tileComponent.setMapReference(tile);
                    }
                    this.children.push(tileNode);
                }
            });

            this.levelData.iterateEntities((entity) => {
                if (entity.blueprint) {
                    let blueprint = entity.blueprint;
                    this.DEBUG(`Constructing entity [${entity.x},${entity.y}] - ${blueprint}`);
                    let entityNode = nodeBuilder.createChildAtPosition(this.node, blueprint, [entity.x * scale, entity.y * scale]);
                    let entityComponent = <Entity>entityNode.getJSComponent("Entity");
                    if (entityComponent) {
                        entityComponent.setMapReference(entity);
                    }
                    this.children.push(entityNode);
                }
            });

            this.node.position2D = [offsetX, offsetY];

        } finally {
            this.DEBUG(`Rendering complete after ${new Date().getTime() - start} ms`);
        }
    }
}

export = LevelRenderer;
