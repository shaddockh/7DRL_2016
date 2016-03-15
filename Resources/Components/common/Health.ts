"atomic component";
import CustomJSComponent from "CustomJSComponent";
import NodeEvents from "NodeEvents";
import {ComponentEvents} from "Constants";

class Health extends CustomJSComponent {
    inspectorFields = {
        debug: false,
        life: 1
    };
    life: number = 1;

    start() {
        this.debug = true;
        this.setActionMap({
            [ComponentEvents.onHit]: this.onHit.bind(this),
            [ComponentEvents.onAdjustHealth]: this.onAdjustHealth.bind(this),

        });
    }

    onHit(data: SenderComponentTriggerAction) {
        this.life--;
        // send a notification that health has changed
        NodeEvents.trigger(this.node, ComponentEvents.onHealthChanged);
        this.DEBUG(`Life reduced by ${data.senderComponent.node.name}.  Current Life: ${this.life} `);
        if (this.life <= 0) {
            // send an onDie message as if it came from the bumper
            NodeEvents.trigger<SenderComponentTriggerAction>(this.node, ComponentEvents.onDie, { senderComponent: data.senderComponent });
        }
    }

    onAdjustHealth(health) {
        this.life += health;
        NodeEvents.trigger(this.node, ComponentEvents.onHealthChanged);
    }

}
export = Health;
