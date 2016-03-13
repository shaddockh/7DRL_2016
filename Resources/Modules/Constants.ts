export module BroadcastEvents {

    export const gameSceneUnloaded = "game.scene.unloaded";
    export const gameSceneLoaded = "game.scene.loaded";
    export const gameSceneSwitch = "game.scene.switch";
    export const gameSceneAction = "game.scene.action";

    export const gameLevelLoad = "game.level.load";
    export const gameLevelGenerate = "game.level.generate";

    export const uiAttributeSelectionHide = "ui.attributeselection.hide";
    export const uiAttributeSelectionShow = "ui.attributeselection.show";
    export const uiTitleScreenShow = "ui.titlescreen.show";
    export const uiTitleScreenHide = "ui.titlescreen.hide";

}

export module ComponentEvents {
    export const onTryMove = "onTryMove";
    export const onSkipTurn = "onSkipTurn";
    export const onLogAction = "onLogAction";
    export const onMoveBlocked = "onMoveBlocked";
    export const onMoveStart = "onMoveStart";
    export const onMoveComplete = "onMoveComplete";

    export const onBumpedBy = "onBumpedBy";
    export const onUpdateFov = "onUpdateFov";
    export const onDestroy = "onDestroy";
    export const onActionBegin = "onActionBegin";
    export const onActionComplete = "onActionComplete";
    export const onTurnTaken = "onTurnTaken";
    export const onDie = "onDie";
    export const onHit = "onHit";
    export const onAttack = "onAttack";
    export const onHealthChanged = "onHealthChanged";
    export const onAdjustHealth = "onAdjustHealth";

    /** called on an actor when it bumps into something.  The something is contained in the target */
    export const onBumpInto = "onBumpInto";
}

export module Scenes {
    export const title = "Scenes/title.scene";
    export const attributeSel = "Scenes/attribute_sel.scene";
    export const intro = "Scenes/intro.scene";
}
