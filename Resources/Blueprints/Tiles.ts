export const tile_base = {
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

export const tile_floor_generic = {
    inherits: "tile_base",
    StaticSprite2D: {
        sprite: "Sprites/tile_floor_overview.png"
    }
};

export const tile_wall_generic = {
    inherits: "tile_base",
    StaticSprite2D: {
        sprite: "Sprites/tile_floor_overview.png"
    }
};
