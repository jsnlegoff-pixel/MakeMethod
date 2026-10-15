import type {
  AcousticOpenness,
  ButtonFit,
  FabricBreathability,
  FabricDrape,
  FabricHand,
  FabricStretch,
  FlexibilityFeel,
  GasketFit,
  MaterialFamily,
  MaterialTag,
  PliabilityFeel,
  RecoveryFeel,
} from "@/data/types";
import { SHORE_A_BANDS } from "@/data/elastomer-guide";
import { MATERIAL_TAG_META } from "@/data/materials/tags";

export const MATERIAL_FAMILY_LABELS: Record<MaterialFamily, string> = {
  plastic: "Plastic",
  metal: "Metal",
  elastomer: "Elastomer / rubber",
  composite: "Composite",
  fabric: "Fabric / textile",
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

export const BUTTON_FIT_LABELS: Record<ButtonFit, string> = {
  limited: "Limited button use",
  situational: "Situational for buttons",
  common: "Common for buttons",
  preferred: "Preferred for soft buttons",
};

export function shoreBandLabel(band: keyof typeof SHORE_A_BANDS) {
  return SHORE_A_BANDS[band].label;
}

export const FABRIC_HAND_LABELS: Record<FabricHand, string> = {
  crisp: "Crisp hand",
  soft: "Soft hand",
  plush: "Plush hand",
  technical: "Technical hand",
};

export const FABRIC_DRAPE_LABELS: Record<FabricDrape, string> = {
  stiff: "Stiff drape",
  moderate: "Moderate drape",
  fluid: "Fluid drape",
};

export const FABRIC_STRETCH_LABELS: Record<FabricStretch, string> = {
  none: "Little/no stretch",
  limited: "Limited stretch",
  moderate: "Moderate stretch",
  high: "High stretch",
};

export const FABRIC_BREATHABILITY_LABELS: Record<FabricBreathability, string> = {
  low: "Low breathability",
  moderate: "Moderate breathability",
  high: "High breathability",
};

export const ACOUSTIC_OPENNESS_LABELS: Record<AcousticOpenness, string> = {
  closed: "Acoustically closed",
  "semi-open": "Semi-open acoustics",
  open: "Acoustically open",
};
