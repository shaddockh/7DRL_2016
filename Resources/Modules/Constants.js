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
    ComponentEvents.onBumpedBy = "onBumpedBy";
    ComponentEvents.onUpdateFov = "onUpdateFov";
    ComponentEvents.onDestroy = "onDestroy";
    ComponentEvents.onActionBegin = "onActionBegin";
    ComponentEvents.onActionComplete = "onActionComplete";
    ComponentEvents.onTurnTaken = "onTurnTaken";
    ComponentEvents.onDie = "onDie";
    ComponentEvents.onHit = "onHit";
    ComponentEvents.onAttack = "onAttack";
    ComponentEvents.onHealthChanged = "onHealthChanged";
    ComponentEvents.onAdjustHealth = "onAdjustHealth";
    /** called on an actor when it bumps into something.  The something is contained in the target */
    ComponentEvents.onBumpInto = "onBumpInto";
})(ComponentEvents = exports.ComponentEvents || (exports.ComponentEvents = {}));
var Scenes;
(function (Scenes) {
    Scenes.title = "Scenes/title.scene";
    Scenes.attributeSel = "Scenes/attribute_sel.scene";
    Scenes.intro = "Scenes/intro.scene";
})(Scenes = exports.Scenes || (exports.Scenes = {}));
