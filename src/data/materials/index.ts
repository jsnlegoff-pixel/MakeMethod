import type { Material } from "../types";
import { compositeMaterials } from "./composites";
import { elastomerMaterials } from "./elastomers";
import { fabricMaterials } from "./fabrics";
import { metalMaterials } from "./metals";
import { plasticMaterials } from "./plastics";
import { tagsByMaterialId } from "./tags";

const catalog = [
  ...plasticMaterials,
  ...metalMaterials,
  ...elastomerMaterials,
  ...compositeMaterials,
  ...fabricMaterials,
];

/** Merge central specialty-tag map onto catalog entries. */
export const materials: Material[] = catalog.map((m) => ({
  ...m,
  tags: tagsByMaterialId[m.id] ?? m.tags ?? [],
}));

export function getMaterial(id: string) {
  return materials.find((m) => m.id === id);
}

export function materialsByFamily() {
  return {
    plastic: materials.filter((m) => m.family === "plastic"),
    metal: materials.filter((m) => m.family === "metal"),
    elastomer: materials.filter((m) => m.family === "elastomer"),
    composite: materials.filter((m) => m.family === "composite"),
    fabric: materials.filter((m) => m.family === "fabric"),
  };
}

export { ALL_MATERIAL_TAGS, MATERIAL_TAG_META } from "./tags";
