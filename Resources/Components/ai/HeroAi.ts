"atomic component";
import NodeEvents from "NodeEvents";
import CustomJSComponent from "CustomJSComponent";
import Entity = require("../common/Entity");
import GameController from "GameController";
import {ComponentEvents} from "Constants";

class HeroAi extends CustomJSComponent {

    inspectorFields = {
        debug: false,
        sightRadius: 10
    };

    sightRadius: number = 10;
    resolveTurn = null;


    start() {
        this.debug = true;
        this.setActionMap({
            [ComponentEvents.onActionComplete]: this.onActionComplete.bind(this),
            [ComponentEvents.onTurnTaken]: this.onTurnTaken.bind(this),
            [ComponentEvents.onMoveComplete]: this.onMoveComplete.bind(this),
            [ComponentEvents.onSkipTurn]: this.onSkipTurn.bind(this),
            [ComponentEvents.onDie]: this.onDie.bind(this),
            [ComponentEvents.onHit]: this.onHit.bind(this),
            [ComponentEvents.onAttack]: this.onAttack.bind(this),
            [ComponentEvents.onBumpInto]: this.onBumpInto.bind(this),
            [ComponentEvents.onHealthChanged]: this.onHealthChanged.bind(this)
        });

        const level = this.levelController;
        this.DEBUG("Registering self with scheduler");
        level.registerActor(this);

        // TODO: we need to unlock the engine here for some reason.  It would be better if there were a less invasive way
        level.engine.unlock();
        level.updateFov(this.getPosition(), this.sightRadius);
    }

    /** Pointer to be called when the action is complete.  The complete promise will overwrite this */
    //onActionComplete = null;

    act() {
        this.DEBUG("contemplating action.");
        NodeEvents.trigger<SenderComponentTriggerAction>(this.node, ComponentEvents.onActionBegin, {
            senderComponent: this
        });

        // we are returning a 'thenable' which tells the scheduler to not move on to the next actor
        // until this actor has completed.  This is overriding the onTurnTaken event on this class with
        // the callback passed to the then method, which means that when this class gets an onTurnTaken
        // event, it will resolve the then.
        // See: http://ondras.github.io/rot.js/manual/#timing/engine for some more information.
        return {
            then: (resolve) => {
                this.DEBUG("starting action.");
                this.setTurnResolver(resolve);
            }
        };
    }

    onActionComplete() {
        this.DEBUG("Received onActionComplete.");
        // call the callback, notifying the scheduler that we are done
        if (this.resolveTurn) {
            this.DEBUG("End of turn.");
            this.resolveTurn();
        }
    }

    setTurnResolver(resolver) {
        this.DEBUG("Setting turn resolver");
        this.resolveTurn = resolver;
    }

    onTurnTaken() {

        this.deferAction(() => {
            GameController.gameState.incTurn();
            this.levelController.updateFov(this.getPosition());
        });

        NodeEvents.trigger<SenderComponentTriggerAction>(this.node, ComponentEvents.onActionComplete, { senderComponent: this });
    }

    getPosition(): Position2D {
        return this.getJSComponent<Entity>("Entity").getPosition();
    }

    deferredActions = [];
    deferAction(action) {
        this.deferredActions.push(action);
    }

    update() {
        while (this.deferredActions.length) {
            let action = this.deferredActions.pop();
            action();
        }
    }

    // Action Handlers

    onMoveComplete() {
        NodeEvents.trigger<SenderComponentTriggerAction>(this.node, ComponentEvents.onTurnTaken, { senderComponent: this });
        //gameState.getCurrentLevel().setCameraTarget(this.node);
    }

    onSkipTurn() {
        NodeEvents.trigger<LogMessageTriggerAction>(this.node, ComponentEvents.onLogAction, { message: "Waiting..." });
        NodeEvents.trigger<SenderComponentTriggerAction>(this.node, ComponentEvents.onLogAction, { senderComponent: this });
    }

    onDie(data: SenderComponentTriggerAction) {
        this.DEBUG("Killed!");
        this.levelController.deregisterActor(this);
        GameController.gameOver();
    }

    onHit(data: SenderComponentTriggerAction) {
        this.DEBUG(`onHit by  ${data.senderComponent.node.name}`);
        const entityComponent = <Entity>data.senderComponent.node.getJSComponent("Entity");
        NodeEvents.trigger<LogMessageTriggerAction>(this.node, ComponentEvents.onLogAction, { message: `You are attacked by ${entityComponent.screenName}` });
    }

    onAttack(data: TargetComponentTriggerAction) {
        const entityComponent = <Entity>data.targetComponent.node.getJSComponent("Entity");
        this.DEBUG(`Attacked ${data.targetComponent.node.name}`);
        NodeEvents.trigger<LogMessageTriggerAction>(this.node, ComponentEvents.onLogAction, { message: `You attack ${entityComponent.screenName}` });
        NodeEvents.trigger<SenderComponentTriggerAction>(this.node, ComponentEvents.onLogAction, { senderComponent: this });
        // move will handle the turn taken
        // TODO: need to clean up the whole turn taking logic somehow, it could get really messy really quickly.
        // triggerEvent.trigger(this.node, 'onTurnTaken', this, this.node);
        NodeEvents.trigger<SenderComponentTriggerAction>(this.node, ComponentEvents.onActionComplete, { senderComponent: this });
    }

    onBumpInto(data: TargetComponentTriggerAction) {
        this.DEBUG(`bumped into ${data.targetComponent.node.name}`);
        const entityComponent = <Entity>data.targetComponent.node.getJSComponent("Entity");
        if (entityComponent.attackable) {
            NodeEvents.trigger<TargetComponentTriggerAction>(this.node, ComponentEvents.onAttack, { targetComponent: data.targetComponent });
        } else if (entityComponent.bumpable) {
            NodeEvents.trigger<SenderComponentTriggerAction>(data.targetComponent.node, ComponentEvents.onBumpedBy, { senderComponent: this });
            NodeEvents.trigger<SenderComponentTriggerAction>(this.node, ComponentEvents.onActionComplete, { senderComponent: this });
        }
    }

    onHealthChanged() {
        GameController.gameState.updateUi();
    }
}
export = HeroAi;
