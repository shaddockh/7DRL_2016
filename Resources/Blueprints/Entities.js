"use strict";
exports.entity_base = {
    isPrefab: true,
    prefabDir: "Prefabs/Entities",
    Entity: {},
};
/** ACTORS */
exports.actor = {
    inherits: "entity_base",
    Entity: {
        blocksPath: true,
        blocksLight: false,
        bumpable: true,
        attackable: true
    }
};
exports.hero = {
    inherits: "actor",
    Entity: {
        screenName: "Hero"
    },
    StaticSprite2D: {
        sprite: "Sprites/spritesheet_1.png",
        orderInLayer: 12
    },
    PlayerInputHandler: {
        debug: false
    },
    GridMover: {
        debug: false,
    },
};
exports.enemy_base = {
    inherits: "actor",
    Entity: {
        screenName: "Enemy"
    },
    StaticSprite2D: {
        sprite: "Sprites/spritesheet_3.png",
        orderInLayer: 12
    },
    GridMover: {
        debug: false,
    },
};
exports.lost_soul = {
    inherits: "enemy_base",
    Entity: {
        screenName: "Lost Soul"
    },
    StaticSprite2D: {
        color: [1, 0, 1, 1]
    }
};
