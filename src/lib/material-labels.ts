import type {
  FlexibilityFeel,
  GasketFit,
  MaterialFamily,
  MaterialTag,
  PliabilityFeel,
  RecoveryFeel,
} from "@/data/types";
import { MATERIAL_TAG_META } from "@/data/materials/tags";

export const MATERIAL_FAMILY_LABELS: Record<MaterialFamily, string> = {
  plastic: "Plastic",
  metal: "Metal",
  elastomer: "Elastomer / rubber",
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

export const FLEXIBILITY_LABELS: Record<FlexibilityFeel, string> = {
  stiff: "Stiffer flex",
  moderate: "Moderate flex",
  flexible: "Flexible",
  "very-flexible": "Very flexible",
};

export const PLIABILITY_LABELS: Record<PliabilityFeel, string> = {
  firm: "Firm",
  medium: "Medium soft",
  soft: "Soft / pliable",
  "very-soft": "Very soft",
};

export const RECOVERY_LABELS: Record<RecoveryFeel, string> = {
  limited: "Limited recovery",
  fair: "Fair recovery",
  good: "Good recovery",
  excellent: "Excellent recovery",
};

export const GASKET_FIT_LABELS: Record<GasketFit, string> = {
  limited: "Limited gasket fit",
  situational: "Situational gasket fit",
  common: "Common gasket use",
  preferred: "Preferred for gaskets/seals",
};
