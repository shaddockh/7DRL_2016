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
    export const onHandleBump = "onHandleBump";
    export const onUpdateFov = "onUpdateFov";
    export const onDestroy = "onDestroy";

}
