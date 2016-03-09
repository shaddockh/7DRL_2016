export const entity_base = {
    isPrefab: true,
    prefabDir: "Prefabs/Entities",
    Entity: {},
};

/** ACTORS */
export const actor = {
    inherits: "entity_base",
    Entity: {
        blocksPath: true,
        blocksLight: false,
        bumpable: true,
        attackable: true
    }
};


export const hero = {
    inherits: "actor",
    Entity: {
        screenName: "Hero"
    },
    StaticSprite2D: {
        sprite: "Sprites/player.png",
        orderInLayer: 12
    },
    PlayerInputHandler: {
        debug: false
    },
    // PointLight2D: {
    //     castShadows: true,
    //     radius: 2,
    //     numRays: 64,
    //     color: [0.9, 0.7, 0.5, 0.7],
    //     backtrace: true
    // },
    /*
     *LightFlicker: {
     *    baseRange: 2,
     *    speed: 0.2
     *},
     */
    GridMover: {
        debug: false,
        speed: 0.25,
        constantMotion: true
    },
    // Make sure our actions are reported to the log
    //ActionLogger: {},
    // EventSound: {
    //     eventMap: {
    //         onMoveStart: "Sounds/footstep02.ogg",
    //         onAttack: "Sounds/knifeSlice.ogg"
    //     }
    // },
    // HeroAi: {
    //     debug: false
    // },
    // Health: {
    //     life: 10
    // }
};
