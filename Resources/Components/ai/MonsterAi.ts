"atomic component";

import NodeEvents from "NodeEvents";
import CustomJSComponent from "CustomJSComponent";

import * as ROT from "rot";
import {vec2} from "gl-matrix";
import Entity = require("../common/Entity");
import {ComponentEvents} from "Constants";

class MonsterAi extends CustomJSComponent {

    inspectorFields = {
        debug: false,
        chaseEnemy: true,
        deathEffect: "death_effect",
        sightRadius: 4,
        trackingRadius: 8,
        isHunting: false
    };

    chaseEnemy: boolean;
    isHunting: boolean;
    trackingRadius: number;
    sightRadius: number;
    deathEffect: string;

    alive = true;

    resolveTurn() {
        // nothing to do
    };


    start() {
        this.debug = true;
        this.setActionMap({
            [ComponentEvents.onActionComplete]: this.onActionComplete.bind(this),
            [ComponentEvents.onDie]: this.onDie.bind(this),
            [ComponentEvents.onAttack]: this.onAttack.bind(this),
            [ComponentEvents.onBumpInto]: this.onBumpInto.bind(this),
            [ComponentEvents.onMoveComplete]: this.onMoveComplete.bind(this),
            [ComponentEvents.onDestroy]: this.onDestroy.bind(this)
        });

        if (this.levelController) {
            this.DEBUG("Registering self with scheduler");
            this.levelController.registerActor(this);
        }
    }

    canWalk(point) {
        let pos = this.getJSComponent<Entity>("Entity").getPosition();

        // See if we are trying to get to ourselves
        if (vec2.dist(point, pos) === 0) {
            return true;
        }

        const level = this.levelController;
        if (!level.isValidPos(point) || level.getTileAt(point).terrainType !== TileType.floor) {
            return false;
        }

        let canWalk = true;
        level.iterateEntitiesAt(point, (entity) => {
            if (entity.entityComponent) {
                if (entity.entityComponent.blocksPath) {
                    canWalk = false;
                    return false;
                }
            }
        });

        return canWalk;
    }

    setTurnResolver(resolver) {
        this.resolveTurn = resolver;
    }

    onActionComplete() {
        // call the callback, notifying the scheduler that we are done, but
        // wait until all pending activities have finished
        if (this.resolveTurn) {
            setImmediate(() => {
                this.DEBUG("End of turn.");
                this.resolveTurn();
            });
        }
    }

    act() {
        if (!this.alive) {
            this.DEBUG("Returning from act because of death");
            return;
        }

        if (!this.chaseEnemy) {
            return;
        }

        this.DEBUG("contemplating action.");
        const entityComponent = this.getJSComponent<Entity>("Entity");

        let position = entityComponent.getPosition();
        let nearbyEntities = this.levelController.getEntitiesInRadius(position, this.trackingRadius);
        let hero = nearbyEntities.find((entity) => entity.blueprint == "hero");

        // no hero in radius..go back to sleep
        if (!hero) {
            return;
        }

        let playerPos = hero.entityComponent.getPosition();

        const astar = new ROT.Path.AStar(playerPos[0], playerPos[1], (x, y) => this.canWalk([x, y]), {
            topology: 4
        });

        let path = [];
        astar.compute(position[0], position[1], (x, y) => {
            path.push([x, y]);
        });

        path.shift(); // remove current position

        // TODO ideally we would want to scan the sight radius, but for now we are just going to see if
        // we are in range of the hero

        // get a direction vector
        if (!this.isHunting && path.length < this.sightRadius && path.length > 0) {
            this.isHunting = true;
            this.DEBUG("enemy seen.  switching to hunting.");
        }

        if (this.isHunting && path.length < this.trackingRadius && path.length > 0) {
            this.DEBUG(`hunting enemy located ${path.length} steps away.`);
            let target = path.shift();
            let dir = vec2.sub(vec2.create(), target, position);
            vec2.normalize(dir, dir);

            NodeEvents.trigger<MoveOffsetTriggerAction>(this.node, ComponentEvents.onTryMove, { offset: [dir[0], dir[1]] });

            // we are returning a 'thenable' which tells the scheduler to not move on to the next actor
            // until this actor has completed.  This is overriding the onTurnTaken event on this class with
            // the callback passed to the then method, which means that when this class gets an onTurnTaken
            // event, it will resolve the then.
            // See: http://ondras.github.io/rot.js/manual/#timing/engine for some more information.
            this.DEBUG("Scheduling next action");
            return {
                then: (resolve) => {
                    this.setTurnResolver(resolve);
                }
            };
            //return {
            //then: (resolve) => {
            //this.DEBUG('starting action');
            //this.onActionComplete = (() => {
            //this.DEBUG('action complete.');
            //// Unhook the onActionComplete event
            //this.onActionComplete = null;
            //// Call the callback, notifying the scheduler that we are done
            //resolve();
            //});
            //}
            //};
        }
    }


    onDie(data: SenderComponentTriggerAction) {
        this.alive = false;
        this.DEBUG("Killed!");
        this.levelController.deregisterActor(this);
        // if (this.deathEffect) {
        //     gameState.getCurrentLevelRenderer().addVisualEffect(this.deathEffect, this.node.position2D);
        // }

        const entityComponent = <Entity>this.node.getJSComponent("Entity");
        NodeEvents.trigger<LogMessageTriggerAction>(data.senderComponent.node, ComponentEvents.onLogAction, { message: `${entityComponent.screenName} dies.` });
        // this.levelController.killEnemy();
        NodeEvents.trigger(this.node, ComponentEvents.onDestroy);
    }

    onAttack(data: TargetComponentTriggerAction) {
        this.DEBUG(`Attacked ${data.targetComponent.node.name}`);
        NodeEvents.trigger<SenderComponentTriggerAction>(data.targetComponent.node, ComponentEvents.onHit, { senderComponent: this });
        // handled in onMoveComplete -- note that this won't work for actors that attack without moving.
        // call onActionComplete since we are done
        NodeEvents.trigger<SenderComponentTriggerAction>(this.node, ComponentEvents.onActionComplete, { senderComponent: this });
    }

    onBumpInto(data: TargetComponentTriggerAction) {
        const entityComponent = <Entity>data.targetComponent.node.getJSComponent("Entity");

        this.DEBUG(`Bumped into ${data.targetComponent.node.name}`);
        // just attack, don't allow for picking up items or other bump actions
        if (entityComponent.attackable) {
            NodeEvents.trigger<TargetComponentTriggerAction>(this.node, ComponentEvents.onAttack, { targetComponent: data.targetComponent });
        }
    }

    onMoveComplete() {
        NodeEvents.trigger<SenderComponentTriggerAction>(this.node, ComponentEvents.onActionComplete, { senderComponent: this });
    }

    onDestroy() {
        this.DEBUG("Destroying node");
        Atomic.destroy(this.node);
    }
}
export = MonsterAi;
