"atomic component";
import NodeEvents from "NodeEvents";
import {ComponentEvents} from "Constants";
//import gameState from '../../Modules/gameState';
import CustomJSComponent from "CustomJSComponent";

const enum PlayerActions {
    None,
    MoveLeft,
    MoveRight,
    MoveUp,
    MoveDown,
    SkipTurn
};

class PlayerInputHandler extends CustomJSComponent {

    inspectorFields = {
        debug: false
    };

    /**
     * Are we idle, waiting for an action?
     */
    idle = false;

    keymap = {
        [PlayerActions.MoveLeft]: [Atomic.KEY_LEFT, Atomic.KEY_H, Atomic.KEY_A],
        [PlayerActions.MoveRight]: [Atomic.KEY_RIGHT, Atomic.KEY_L, Atomic.KEY_D],
        [PlayerActions.MoveUp]: [Atomic.KEY_UP, Atomic.KEY_K, Atomic.KEY_W],
        [PlayerActions.MoveDown]: [Atomic.KEY_DOWN, Atomic.KEY_J, Atomic.KEY_S],
        [PlayerActions.SkipTurn]: [Atomic.KEY_SPACE]
        //[PlayerActions.DUMP_METRICS]: [Atomic.KEY_0]
    };

    start() {
        this.setActionMap({
            [ComponentEvents.onActionBegin]: this.onActionBegin.bind(this)
        });
    }

    getCurrentAction() {
        let input = Atomic.input,
            keymap = this.keymap;

        for (let action in keymap) {
            let keys = keymap[action];
            if (keys && keys.length) {
                for (let i = 0; i < keys.length; i++) {
                    if (input.getKeyPress(keys[i])) {
                        return parseInt(action);
                    }
                }
            }
        }
        return PlayerActions.None;
    }

    /**
     * On the start of our turn, we want to start listening for player commands
     */
    onActionBegin() {
        this.idle = true;
    }

    update( /*timeStep*/) {
        //if (!gameState.getCurrentLevel().isGameOver && this.idle) {
        if (this.idle) {
            let action = this.getCurrentAction();
            if (action !== PlayerActions.None) {
                this.idle = false;
                switch (action) {
                    case PlayerActions.MoveLeft:
                        this.DEBUG("Processing Action: move left");
                        NodeEvents.trigger<MoveOffsetTriggerAction>(this.node, ComponentEvents.onTryMove, { offset: [-1, 0] });
                        break;
                    case PlayerActions.MoveRight:
                        this.DEBUG("Processing Action: move right");
                        NodeEvents.trigger<MoveOffsetTriggerAction>(this.node, ComponentEvents.onTryMove, { offset: [1, 0] });
                        break;
                    case PlayerActions.MoveUp:
                        this.DEBUG("Processing Action: move up");
                        NodeEvents.trigger<MoveOffsetTriggerAction>(this.node, ComponentEvents.onTryMove, { offset: [0, 1] });
                        break;
                    case PlayerActions.MoveDown:
                        this.DEBUG("Processing Action: move down");
                        NodeEvents.trigger<MoveOffsetTriggerAction>(this.node, ComponentEvents.onTryMove, { offset: [0, -1] });
                        break;
                    case PlayerActions.SkipTurn:
                        this.DEBUG("Processing Action: skip turn");
                        NodeEvents.trigger(this.node, ComponentEvents.onSkipTurn);
                        break;
                    // case PlayerActions.DUMP_METRICS:
                    //     this.DEBUG('Processing Action: dump metrics');
                    //     metrics.dumpMetrics();
                    //     this.idle = true;
                    //     break;

                    default:
                        this.idle = true;
                        break;
                }
            }
        }
    }
}

export = PlayerInputHandler;
