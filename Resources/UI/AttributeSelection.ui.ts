import CustomUIWindow from "./CustomUIWindow";
import * as PubSub from "pubsub-js";

export default class AttributeSelectionUi extends CustomUIWindow {

    channelTopics = {
        "ui.attributeselection.hide": this.closeWindow
    };

    static register(baseUi: Atomic.UIView) {
        PubSub.subscribe("ui.attributeselection.show", (msg, data) => {
            console.log("in");
            let wnd = new AttributeSelectionUi(baseUi);
            wnd.openWindow(data);
        });
    }

    constructor(uiView) {
        super(uiView, "Ui/AttributeSelection.ui.tb");
    }

    openWindow(parms?: any) {

        super.openWindow({ windowSettings: Atomic.UI_WINDOW_SETTINGS_NONE });

        let wnd = this.window;
        //wnd.setRect([0, 0, 400, 300]);
        //wnd.text = "Play Game";

        let btn = <Atomic.UIButton> wnd.getWidget("btnPlay");
        btn.onClick = () => {
            this.closeWindow();
            let action : AttributeSelectionSceneActionMessage = {
                action: "show_playfield"
            };

            PubSub.publish("game.attribute_selection_scene.action", action);
        };

        wnd.center();
    }
}
