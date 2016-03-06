import CustomUIWindow from "./CustomUIWindow";
import * as PubSub from "pubsub-js";

export default class TitleScreenUi extends CustomUIWindow {

    channelTopics = {
        "ui.titlescreen.hide": this.closeWindow
    };

    static register(baseUi: Atomic.UIView) {
        PubSub.subscribe("ui.titlescreen.show", (msg, data) => {
            let wnd = new TitleScreenUi(baseUi);
            wnd.openWindow(data);
        });
    }

    constructor(uiView) {
        super(uiView, "Ui/TitleScreen.ui.tb");
    }

    openWindow(parms?: any) {

        super.openWindow({ windowSettings: Atomic.UI_WINDOW_SETTINGS_NONE });

        let wnd = this.window;
        //wnd.setRect([0, 0, 400, 300]);
        //wnd.text = "Play Game";

        let btn = <Atomic.UIButton> wnd.getWidget("btnPlay");
        btn.onClick = () => {
            this.closeWindow();
            let action : TitleSceneActionMessage = {
                action: "show_attribute_selection"
            };

            PubSub.publish("game.scene.action", action);
        };

        wnd.center();
    }
}
