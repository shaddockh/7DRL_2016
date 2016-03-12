import {default as LevelData, EntityList} from "Generators/LevelData";
import {GLM} from "gl-matrix";
import * as ROT from "rot";

export default class LevelController {
    private levelData: LevelData;

    /** ROT scheduler */
    private scheduler: ROT.Scheduler = null;

    /** ROT engine */
    engine: ROT.Engine = null;

    constructor(levelData: LevelData) {
        console.log("Creating new level controller");
        this.levelData = levelData;
        this.scheduler = new ROT.Scheduler.Simple();
        this.engine = new ROT.Engine(this.scheduler);
    }

    start() {
        this.engine.start();
    }

    registerActor(ai: ROT.Actionable) {
        this.scheduler.add(ai, true);
    }

    deregisterActor(ai: ROT.Actionable) {
        this.scheduler.remove(ai);
    }

    updateFov(position: Position2D, radius? : number) {
        // if (this.useFov) {
        //     triggerEvent.trigger(this.node, 'onUpdateFov', position, this.fovRadius, this.mapData);
        // }
    }

    getTileAt(pos: Position2D | GLM.IArray): TileData {
        return this.levelData.getTile(pos[0], pos[1]);
    }

    isValidPos(pos: Position2D | GLM.IArray): boolean {
        return this.levelData.inBounds(pos[0], pos[1]);
    }

    getEntitiesAt(pos: Position2D | GLM.IArray): EntityList {
        const result = new EntityList();
        this.levelData.iterateEntitiesAt(pos[0], pos[1], (entity) => {
            result.add(entity);
        });
        return result;
    }

    getEntitiesInRadius(pos: Position2D | GLM.IArray, radius: number): EntityList {
        let x = pos[0],
            y = pos[1];
        let boundsX = [x - radius, x + radius];
        let boundsY = [y - radius, y + radius];

        const result = new EntityList();
        this.levelData.iterateEntities((entity) => {
            if (entity.x >= boundsX[0] && entity.x <= boundsX[1]
                && entity.y >= boundsY[0] && entity.y <= boundsY[1]) {
                result.add(entity);
            }
        });
        return result;
    }

    iterateEntitiesAt(pos: Position2D | GLM.IArray, callback: (element: EntityData) => boolean|void) {
        this.levelData.iterateEntitiesAt(pos[0], pos[1], callback);
    }

}
