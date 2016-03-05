import * as PubSub from "pubsub-js";

/**
 * wrapper to be used for ui windows.  Will handle loading up the layout and
 * setting some properties.
 */
export default class CustomUIWindow {
    window:Atomic.UIWindow = null;

    channelTopics = {};

    layoutFilename:string = null;
    uiView:Atomic.UIView = null;

    constructor(uiView, layoutFilename) {
        this.layoutFilename = layoutFilename;
        this.uiView = uiView;

        for (let topic in this.channelTopics) {
            PubSub.subscribe(topic, (message: string, data: any ) => {
                    this.channelTopics[topic].apply(this, data);
            });
        }
    }

    openWindow(options = {
      windowSettings: Atomic.UI_WINDOW_SETTINGS_TITLEBAR
    }) {

        const window = this.window = new Atomic.UIWindow();
        window.settings = options.windowSettings;
        window.load(this.layoutFilename);
        window.resizeToFitContent();

        this.uiView.addChild(window);
    }

    closeWindow() {
        if (this.window) {
            this.window.die();
            this.window = null;
        }

        for (let topic in this.channelTopics) {
            PubSub.unsubscribe(topic);
        }
    }
}
