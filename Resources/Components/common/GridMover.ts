"atomic component";
import CustomJSComponent from "CustomJSComponent";
import Entity = require("./Entity");
//import gameState from '../../Modules/gameState';
import GameController from "GameController";
import NodeEvents  from "NodeEvents";
import {vec2} from "gl-matrix";
import {ComponentEvents} from "Constants";

class GridMover extends CustomJSComponent implements ComponentActionListener {
    inspectorFields = {
        debug: false,
        cellPixelSize: 16
    };


    speed = 1;
    smoothMovement = true;
    cellPixelSize = 16;
    cellUnitSize = 0;

    private postMoveActions = [];
    private targetPos;
    private startPos;
    private moving: boolean = false;
    private blocked: boolean = false;
    private bumping: boolean = false;
    private t: number;
    private movementVector;


    queuePostMoveAction(action) {
        this.postMoveActions.push(action);
    }

    executePostMoveActions() {
        while (this.postMoveActions.length) {
            // pull the actions off the queue and run it
            let action = this.postMoveActions.shift();
            action();
        }
    }

    get entity(): Entity {
        return this.getJSComponent<Entity>("Entity");
    }

    start() {
        this.targetPos = this.node.position2D;
        this.startPos = this.node.position2D;
        this.moving = false;
        this.debug = true;
        this.cellUnitSize = this.cellPixelSize * Atomic.PIXEL_SIZE;
    }

    doAction(message: string, data: any): any {
        switch (message) {
            case ComponentEvents.onTryMove:
                this.onTryMove(data);
                break;
        }
    }

    onTryMove(data: MoveOffsetTriggerAction) {
        if (this.moving || this.bumping || this.blocked) {
            return;
        }
        try {

            this.DEBUG("Entering Move");
            this.startPos = this.node.position2D;
            this.targetPos = vec2.add(vec2.create(), this.startPos, vec2.scale(vec2.create(), data.offset, this.cellUnitSize));
            this.t = 0;

            // see if we can move into the next space
            let mapPos = this.entity.getPosition();
            let newMapPos = vec2.add(vec2.create(), mapPos, data.offset);
            this.DEBUG(`Current position: ${mapPos[0]},${mapPos[1]}`);
            this.DEBUG(`Moving to: ${newMapPos[0]},${newMapPos[1]}`);

            this.moving = true;
            // check to see if we are blocked

            // First see if we are blocked by terrain
            if (!GameController.gameState.currentLevelData.inBoundsPos(newMapPos) ||
                GameController.gameState.currentLevelData.getTilePos(newMapPos).terrainType !== TileType.floor) {
                // Queue up an action to notify the player that the move is blocked
                this.queuePostMoveAction(() => {
                    this.DEBUG("Blocked by terrain");
                    NodeEvents.trigger<LogMessageTriggerAction>(this.node, ComponentEvents.onLogAction, { message: "Blocked." });
                    NodeEvents.trigger<MovePositionTriggerAction>(this.node, ComponentEvents.onMoveBlocked, { from: mapPos, to: newMapPos });
                    NodeEvents.trigger(this.node, ComponentEvents.onMoveComplete);
                });

                this.blocked = true;
                this.moving = false;
            } else {
                GameController.gameState.currentLevelData.iterateEntitiesAtPos(newMapPos, (entity) => {
                    // We are going to bump the top level entity if it's bumpable
                    if (entity.entityComponent) {
                        if (entity.entityComponent.blocksPath) {
                            this.blocked = true;
                            this.moving = false;
                            this.queuePostMoveAction(() => {
                                this.DEBUG("Blocked by Entity");
                                NodeEvents.trigger<MovePositionTriggerAction>(this.node, ComponentEvents.onMoveBlocked, { from: mapPos, to: newMapPos });
                                NodeEvents.trigger(this.node, ComponentEvents.onMoveComplete);
                            });
                        }
                        if (entity.entityComponent.bumpable) {
                            // Let's exit the loop since we only want to deal with the first entity
                            NodeEvents.trigger<BumpTriggerAction>(this.node, ComponentEvents.onHandleBump, { target: entity.node });
                            return false;
                        } else {
                            return true;
                        }
                    }
                });
            }

            if (this.moving) {
                this.movementVector = data.offset;
                this.startPos = this.node.position2D;
                this.DEBUG(`Moving to ${this.targetPos} from ${this.startPos}, vector = ${data.offset}`);

                NodeEvents.trigger(this.node, ComponentEvents.onMoveStart, { from: mapPos, to: newMapPos });

                this.entity.setPosition(newMapPos);
                this.node.position2D = this.targetPos;
                NodeEvents.trigger(this.node, ComponentEvents.onMoveComplete);
                // Queue up an action to notify that we are done moving.
                // this.queuePostMoveAction(() => {
                //     this.entity.setPosition(this.targetPos);
                //     NodeEvents.trigger(this.node, ComponentEvents.onMoveComplete);
                // });
            }

        } finally {
            this.moving = false;
            this.blocked = false;
            this.bumping = false;
        }
    }
}
export = GridMover;
