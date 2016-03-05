
declare interface ActionMessage {
    action: string;
    data?: any;
}

declare interface SceneActionMessage extends ActionMessage {
}

declare interface TitleSceneActionMessage extends SceneActionMessage {
    action: "show_attribute_selection";
}

declare interface AttributeSelectionSceneActionMessage extends SceneActionMessage {
    action: "show_playfield";
}
