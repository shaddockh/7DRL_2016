"use strict";
exports.tile_base = {
    isPrefab: true,
    prefabDir: "Prefabs/Tiles",
    Tile: {
        debug: false
    },
    StaticSprite2D: {
        blendMode: Atomic.BLEND_ALPHA,
        orderInLayer: 0,
        color: [1, 1, 1, 1]
    }
};
exports.tile_floor_generic = {
    inherits: "tile_base",
    StaticSprite2D: {
        sprite: "Sprites/spritesheet_2.png",
        color: [0.5, 0.5, 0.5, 0.5]
    }
};
exports.tile_wall_generic = {
    inherits: "tile_base",
    StaticSprite2D: {
        sprite: "Sprites/spritesheet_0.png",
        color: [0.7, 0.7, 0.5, 0.8]
    }
};
