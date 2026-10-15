import type { MaterialTag } from "../types";

export const MATERIAL_TAG_META: Record<
  MaterialTag,
  { label: string; hint: string }
> = {
  "medical-grade": {
    label: "Medical-grade candidate",
    hint: "Some grades are offered for medical devices — biocompatibility and certifications are grade-specific.",
  },
  "food-contact": {
    label: "Food-contact candidate",
    hint: "Commonly available in food-contact formulations — confirm regulatory status for the exact grade.",
  },
  "chemical-resistant": {
    label: "Chemical resistant",
    hint: "Often selected where chemical exposure matters — resistance is chemistry-, concentration-, and grade-dependent.",
  },
  "hazloc-candidate": {
    label: "HazLoc enclosure candidate",
    hint: "Sometimes considered for industrial / hazardous-location enclosures. HazLoc is a certified equipment rating, not a material label alone.",
  },
  "flame-retardant": {
    label: "Flame-retardant grades",
    hint: "FR formulations exist for many polymers — UL/IEC ratings apply to the finished grade and geometry.",
  },
  "uv-resistant": {
    label: "UV / weather resistant",
    hint: "Better outdoor UV durability than many commodity grades — still verify stabilized formulations.",
  },
  "outdoor-capable": {
    label: "Outdoor-capable",
    hint: "Often used outdoors with appropriate grades/finishes — environment still drives final selection.",
  },
  "high-temp": {
    label: "Higher-temperature service",
    hint: "Relative heat capability vs commodity plastics — continuous-use temperature is grade-specific.",
  },
  "wear-resistant": {
    label: "Wear / bearing candidate",
    hint: "Often chosen for sliding or wear surfaces — tribology depends on grade, load, and lubrication.",
  },
  sterilizable: {
    label: "Sterilization candidate",
    hint: "Some grades tolerate common sterilization methods — method compatibility must be confirmed.",
  },
  "electrical-insulating": {
    label: "Electrical insulating",
    hint: "Commonly used as electrical insulation — dielectric performance is grade- and condition-dependent.",
  },
};

export const ALL_MATERIAL_TAGS = Object.keys(
  MATERIAL_TAG_META
) as MaterialTag[];

/**
 * Educational tag assignments by material id.
 * Screening hints only — not certifications or datasheet claims.
 */
export const tagsByMaterialId: Record<string, MaterialTag[]> = {
  // Plastics
  pp: ["chemical-resistant", "food-contact"],
  hdpe: ["chemical-resistant", "food-contact"],
  ldpe: ["food-contact"],
  pet: ["food-contact"],
  petg: ["food-contact", "medical-grade"],
  pom: ["wear-resistant", "chemical-resistant"],
  nylon: ["wear-resistant"],
  pvc: ["chemical-resistant", "electrical-insulating", "flame-retardant"],
  pbt: ["electrical-insulating", "flame-retardant"],
  peek: [
    "medical-grade",
    "high-temp",
    "chemical-resistant",
    "sterilizable",
    "hazloc-candidate",
  ],
  pei: [
    "medical-grade",
    "high-temp",
    "flame-retardant",
    "sterilizable",
    "hazloc-candidate",
  ],
  pps: [
    "chemical-resistant",
    "high-temp",
    "flame-retardant",
    "hazloc-candidate",
  ],
  asa: ["uv-resistant", "outdoor-capable"],
  pmma: ["uv-resistant", "outdoor-capable"],
  pc: ["flame-retardant", "hazloc-candidate"],

  // Metals
  "ss-304": ["food-contact", "chemical-resistant"],
  "ss-316": [
    "chemical-resistant",
    "medical-grade",
    "food-contact",
    "sterilizable",
    "hazloc-candidate",
  ],
  "ti-6al4v": ["medical-grade", "sterilizable", "high-temp"],
  "al-6061": ["hazloc-candidate"],

  // Elastomers
  silicone: [
    "medical-grade",
    "food-contact",
    "high-temp",
    "sterilizable",
    "outdoor-capable",
  ],
  epdm: ["outdoor-capable", "uv-resistant", "chemical-resistant"],
  nbr: ["chemical-resistant"],

  // Composites
  smc: ["flame-retardant", "hazloc-candidate"],
  gfrp: ["outdoor-capable"],
};
