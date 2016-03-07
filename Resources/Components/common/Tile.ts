"atomic component";
import CustomJSComponent from "CustomJSComponent";

class Tile extends CustomJSComponent {
    inspectorFields = {
        debug: false
    };

    mapEntity:TileData = null;
    currentVisibility = null;

    /**
     * Updates whether this tile is in the field of view of the player
     * @param {float} visibility the amount the tile is visible. from 0 - 1.  Full visibility is 1.0
     */
    onUpdateFov(visibility) {
        this.DEBUG(`Setting visibility of tile at ${this.mapEntity.x},${this.mapEntity.y} to ${visibility}`);
        if (visibility === 1) {
            this.mapEntity.seen = true;
        }

        if (this.mapEntity.seen) {
            visibility = 1;
        }

        // Cache the current visibility so that we don't mess with alpha every update
        if (this.currentVisibility === null || this.currentVisibility !== visibility) {
            (<Atomic.StaticSprite2D>this.node.getComponent("StaticSprite2D")).setAlpha(this.mapEntity.seen ? 1.0 : visibility);
            this.currentVisibility = visibility;
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
