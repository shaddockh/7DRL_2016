
declare interface ActionMessage {
    action: string;
    data?: any;
}

declare interface SceneActionMessage extends ActionMessage {
    scene?: string;
}

declare interface TitleSceneActionMessage extends SceneActionMessage {
    action: "show_attribute_selection";
}

declare interface AttributeSelectionSceneActionMessage extends SceneActionMessage {
    action: "show_playfield";
}

declare interface TileData {
    x: number;
    y: number;
    terrainType: TileType;
    blueprint?: string;
    node?:Atomic.Node;
    tileComponent?:any;
    seen?:boolean;
}
