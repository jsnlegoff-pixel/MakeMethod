import type { Material } from "../types";
import { compositeMaterials } from "./composites";
import { elastomerMaterials } from "./elastomers";
import { metalMaterials } from "./metals";
import { plasticMaterials } from "./plastics";

export const materials: Material[] = [
  ...plasticMaterials,
  ...metalMaterials,
  ...elastomerMaterials,
  ...compositeMaterials,
];

export function getMaterial(id: string) {
  return materials.find((m) => m.id === id);
}

export function materialsByFamily() {
  return {
    plastic: materials.filter((m) => m.family === "plastic"),
    metal: materials.filter((m) => m.family === "metal"),
    elastomer: materials.filter((m) => m.family === "elastomer"),
    composite: materials.filter((m) => m.family === "composite"),
  };
}
