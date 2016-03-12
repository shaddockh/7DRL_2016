declare type Position2D = [number, number];

declare type ListCallback<T> = (element: T) => boolean | void;

declare interface ComponentMessageDispatcher extends Atomic.JSComponent {
    dispatchMessage(msg: string, data: any);
}

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
    node?: Atomic.Node;
    tileComponent?: any;
    seen?: boolean;
}

declare interface EntityData {
    x: number;
    y: number;
    blueprint?: string;
    node?: Atomic.Node;
    entityComponent?: any;
    seen?: boolean;
}

declare interface ComponentActionListener {
    doAction(message: string, data: any): any;
}

declare interface TriggerAction { }
declare interface LogMessageTriggerAction extends TriggerAction {
    message: string;
}
declare interface MovePositionTriggerAction extends TriggerAction {
    from: Array<number>;
    to: Array<number> | any;
}
declare interface MoveOffsetTriggerAction extends TriggerAction {
    offset: Array<number>;
}
declare interface BumpTriggerAction extends TriggerAction {
    target: Atomic.Node;
}
declare interface UpdateFovTriggerAction extends TriggerAction {
    visibility: number;
}

declare interface SenderComponentTriggerAction extends TriggerAction {
    senderComponent: Atomic.JSComponent;
}

declare interface TargetComponentTriggerAction extends TriggerAction {
    targetComponent: Atomic.JSComponent;
}
