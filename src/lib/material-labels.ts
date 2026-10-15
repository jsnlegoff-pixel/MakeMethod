import type { MaterialFamily, MaterialTag } from "@/data/types";
import { MATERIAL_TAG_META } from "@/data/materials/tags";

export const MATERIAL_FAMILY_LABELS: Record<MaterialFamily, string> = {
  plastic: "Plastic",
  metal: "Metal",
  elastomer: "Elastomer",
  composite: "Composite",
};

export function familyLabel(family: MaterialFamily | string) {
  return (
    MATERIAL_FAMILY_LABELS[family as MaterialFamily] ??
    family.charAt(0).toUpperCase() + family.slice(1)
  );
}

export function tagLabel(tag: MaterialTag) {
  return MATERIAL_TAG_META[tag].label;
}

export function tagHint(tag: MaterialTag) {
  return MATERIAL_TAG_META[tag].hint;
}
