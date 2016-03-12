import {default as LevelData, EntityList} from "Generators/LevelData";
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

    getTileAt(pos: Position2D): TileData {
        return this.levelData.getTilePos(pos);
    }

    isValidPos(pos: Position2D): boolean {
        return this.levelData.inBoundsPos(pos);
    }

    getEntitiesAt(pos: Position2D): EntityList {
        const result = new EntityList();
        this.levelData.iterateEntitiesAtPos(pos, (entity) => {
            result.add(entity);
        });
        return result;
    }

    getEntitiesInRadius(pos: Position2D, radius: number): EntityList {
        let [x, y] = [pos[0], pos[1]];
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

    iterateEntitiesAt(pos: Position2D, callback: (element: EntityData) => boolean|void) {
        this.levelData.iterateEntitiesAtPos(pos, callback);
    }

}
