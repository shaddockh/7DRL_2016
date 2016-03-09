"atomic component";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeEvents_1 = require("NodeEvents");
var Constants_1 = require("Constants");
//import gameState from '../../Modules/gameState';
var CustomJSComponent_1 = require("CustomJSComponent");
;
var PlayerInputHandler = (function (_super) {
    __extends(PlayerInputHandler, _super);
    function PlayerInputHandler() {
        _super.apply(this, arguments);
        this.inspectorFields = {
            debug: false
        };
        /**
         * Are we idle, waiting for an action?
         */
        this.idle = false;
        this.keymap = (_a = {},
            _a[1 /* MoveLeft */] = [Atomic.KEY_LEFT, Atomic.KEY_H, Atomic.KEY_A],
            _a[2 /* MoveRight */] = [Atomic.KEY_RIGHT, Atomic.KEY_L, Atomic.KEY_D],
            _a[3 /* MoveUp */] = [Atomic.KEY_UP, Atomic.KEY_K, Atomic.KEY_W],
            _a[4 /* MoveDown */] = [Atomic.KEY_DOWN, Atomic.KEY_J, Atomic.KEY_S],
            _a[5 /* SkipTurn */] = [Atomic.KEY_SPACE],
            _a
        );
        var _a;
    }
    PlayerInputHandler.prototype.getCurrentAction = function () {
        var input = Atomic.input, keymap = this.keymap;
        for (var action in keymap) {
            var keys = keymap[action];
            if (keys && keys.length) {
                for (var i = 0; i < keys.length; i++) {
                    if (input.getKeyPress(keys[i])) {
                        return parseInt(action);
                    }
                }
            }
        }
        return 0 /* None */;
    };
    /**
     * On the start of our turn, we want to start listening for player commands
     */
    PlayerInputHandler.prototype.onActionBegin = function () {
        this.idle = true;
    };
    PlayerInputHandler.prototype.update = function () {
        //if (!gameState.getCurrentLevel().isGameOver && this.idle) {
        var action = this.getCurrentAction();
        if (action !== 0 /* None */) {
            this.idle = false;
            switch (action) {
                case 1 /* MoveLeft */:
                    this.DEBUG("Processing Action: move left");
                    NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onTryMove, { offset: [-1, 0] });
                    break;
                case 2 /* MoveRight */:
                    this.DEBUG("Processing Action: move right");
                    NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onTryMove, { offset: [1, 0] });
                    break;
                case 3 /* MoveUp */:
                    this.DEBUG("Processing Action: move up");
                    NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onTryMove, { offset: [0, 1] });
                    break;
                case 4 /* MoveDown */:
                    this.DEBUG("Processing Action: move down");
                    NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onTryMove, { offset: [0, -1] });
                    break;
                case 5 /* SkipTurn */:
                    this.DEBUG("Processing Action: skip turn");
                    NodeEvents_1.default.trigger(this.node, Constants_1.ComponentEvents.onSkipTurn);
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
    };
    return PlayerInputHandler;
}(CustomJSComponent_1.default));
module.exports = PlayerInputHandler;
