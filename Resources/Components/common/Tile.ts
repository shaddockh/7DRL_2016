"atomic component";
import CustomJSComponent from "CustomJSComponent";
import {ComponentEvents} from "Constants";

class Tile extends CustomJSComponent implements ComponentActionListener {
    inspectorFields = {
        debug: false
    };

    mapEntity: TileData = null;
    currentVisibility = null;

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
     * Updates whether this tile is in the field of view of the player
     * @param {float} visibility the amount the tile is visible. from 0 - 1.  Full visibility is 1.0
     */
    onUpdateFov(data: UpdateFovTriggerAction) {
        this.DEBUG(`Setting visibility of tile at ${this.mapEntity.x},${this.mapEntity.y} to ${data.visibility}`);
        if (data.visibility === 1) {
            this.mapEntity.seen = true;
        }

        if (this.mapEntity.seen) {
            data.visibility = 1;
        }

        // Cache the current visibility so that we don't mess with alpha every update
        if (this.currentVisibility === null || this.currentVisibility !== data.visibility) {
            (<Atomic.StaticSprite2D>this.node.getComponent("StaticSprite2D")).setAlpha(this.mapEntity.seen ? 1.0 : data.visibility);
            this.currentVisibility = data.visibility;
        }
    }

    setMapReference(tileData: TileData) {
        tileData.node = this.node;
        tileData.tileComponent = this;
        this.mapEntity = tileData;
    }

    onDestroy() {
        this.mapEntity.node = null;
        this.mapEntity.tileComponent = null;
    }
}
export = Tile;
