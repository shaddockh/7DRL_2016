"atomic component";
import CustomJSComponent from "CustomJSComponent";
import {ComponentEvents} from "Constants";
//import gameState from '../../Modules/gameState';

class Entity extends CustomJSComponent implements ComponentActionListener {
    inspectorFields = {
        debug: false,
        blocksPath: false,
        blocksLight: false,
        bumpable: false,
        attackable: false,
        fovRemember: false,
        screenName: "entity"
    };


    blocksPath: boolean = false;
    blocksLight: boolean = false;
    bumpable: boolean = false;
    attackable: boolean = false;

    /** The displayable name of this entity */
    screenName: string = "entity";

    /** once seen, don't hide when leaving field of view */
    fovRemember = false;

    private mapEntity = null;

    /** has this entity been seen by the player yet? */
    private seen = false;

    getPosition() {
        return [this.mapEntity.x, this.mapEntity.y];
    }

    setPosition(pos) {
        this.mapEntity.x = pos[0];
        this.mapEntity.y = pos[1];
    }

    setMapReference(mapEntity) {
        mapEntity.node = this.node;
        mapEntity.entityComponent = this;
        this.mapEntity = mapEntity;
    }

    doAction(message: string, data: any) {
        switch (message) {
            case ComponentEvents.onUpdateFov:
                this.onUpdateFov(data);
                break;
            case ComponentEvents.onDestroy:
                this.onDestroy();
        }
    }
    /**
     * Updates whether this entity is in the field of view of the player
     */
    onUpdateFov(data: UpdateFovTriggerAction) {
        this.DEBUG(`Setting visibility of entity at ${this.mapEntity.x},${this.mapEntity.y} to ${data.visibility}`);
        if (data.visibility === 1 || (this.fovRemember && this.seen)) {
            this.getComponent<Atomic.StaticSprite2D>("StaticSprite2D").setAlpha(1);
            this.seen = true;
        } else {
            this.getComponent<Atomic.StaticSprite2D>("StaticSprite2D").setAlpha(data.visibility);
        }
    }

    onDestroy() {
        this.mapEntity.entityComponent = null;
        this.mapEntity.node = null;
        //gameState.getCurrentLevel().mapData.removeEntity(this.mapEntity);
    }
}

export = Entity;
