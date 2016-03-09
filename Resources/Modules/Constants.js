"use strict";
var BroadcastEvents;
(function (BroadcastEvents) {
    BroadcastEvents.gameSceneUnloaded = "game.scene.unloaded";
    BroadcastEvents.gameSceneLoaded = "game.scene.loaded";
    BroadcastEvents.gameSceneSwitch = "game.scene.switch";
    BroadcastEvents.gameSceneAction = "game.scene.action";
    BroadcastEvents.gameLevelLoad = "game.level.load";
    BroadcastEvents.gameLevelGenerate = "game.level.generate";
    BroadcastEvents.uiAttributeSelectionHide = "ui.attributeselection.hide";
    BroadcastEvents.uiAttributeSelectionShow = "ui.attributeselection.show";
    BroadcastEvents.uiTitleScreenShow = "ui.titlescreen.show";
    BroadcastEvents.uiTitleScreenHide = "ui.titlescreen.hide";
})(BroadcastEvents = exports.BroadcastEvents || (exports.BroadcastEvents = {}));
var ComponentEvents;
(function (ComponentEvents) {
    ComponentEvents.onTryMove = "onTryMove";
    ComponentEvents.onSkipTurn = "onSkipTurn";
    ComponentEvents.onLogAction = "onLogAction";
    ComponentEvents.onMoveBlocked = "onMoveBlocked";
    ComponentEvents.onMoveStart = "onMoveStart";
    ComponentEvents.onMoveComplete = "onMoveComplete";
    ComponentEvents.onHandleBump = "onHandleBump";
    ComponentEvents.onUpdateFov = "onUpdateFov";
    ComponentEvents.onDestroy = "onDestroy";
})(ComponentEvents = exports.ComponentEvents || (exports.ComponentEvents = {}));
