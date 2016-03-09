import {blueprintCatalog} from "atomic-blueprintLib";
import * as tiles from "./Tiles";
import * as entities from "./Entities";

function loader(blueprint) {
    console.log(`Loading blueprint: ${blueprint}`);
}

blueprintCatalog.loadBlueprints(tiles, loader);
blueprintCatalog.loadBlueprints(entities, loader);

blueprintCatalog.hydrateAllBlueprints();
