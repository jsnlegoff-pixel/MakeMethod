import type {
  ElastomerTextureId,
  ShoreABandId,
} from "./types";

export const SHORE_A_BANDS: Record<
  ShoreABandId,
  {
    label: string;
    feel: string;
    typicalUses: string;
    /** 0–100 position markers for a simple educational scale UI */
    range: [number, number];
  }
> = {
  "30-40": {
    label: "Shore A ~30–40",
    feel: "Very soft, easy to squash",
    typicalUses: "Ultra-soft buttons, gel-like pads, soft remote keys",
    range: [30, 40],
  },
  "40-50": {
    label: "Shore A ~40–50",
    feel: "Soft, pliable click/press",
    typicalUses: "Consumer soft-touch buttons, keypad tops, grip pads",
    range: [40, 50],
  },
  "50-60": {
    label: "Shore A ~50–60",
    feel: "Medium-soft, controlled press",
    typicalUses: "Appliance keypads, remote buttons, light seals",
    range: [50, 60],
  },
  "60-70": {
    label: "Shore A ~60–70",
    feel: "Medium, springier press",
    typicalUses: "Firmer buttons, gaskets, O-rings, wear pads",
    range: [60, 70],
  },
  "70-80": {
    label: "Shore A ~70–80",
    feel: "Firm rubber",
    typicalUses: "Harder keypad stops, feet, durable grips, many seals",
    range: [70, 80],
  },
  "80-90": {
    label: "Shore A ~80–90",
    feel: "Hard elastomer / almost rigid rubber",
    typicalUses: "Hard bumpers, stiff boots, high-load pads",
    range: [80, 90],
  },
  wide: {
    label: "Wide Shore range",
    feel: "Family spans soft through firm — specify hardness",
    typicalUses: "Depends on compound (buttons, grips, seals, wheels)",
    range: [30, 90],
  },
};

export const ELASTOMER_TEXTURES: Record<
  ElastomerTextureId,
  {
    label: string;
    buttonNote: string;
    look: string;
  }
> = {
  "smooth-matte": {
    label: "Smooth matte",
    buttonNote: "Clean consumer look; hides fingerprints better than gloss.",
    look: "Flat, low-shine face",
  },
  "smooth-gloss": {
    label: "Smooth gloss",
    buttonNote: "Premium sheen; shows fingerprints and micro-scratches more.",
    look: "Reflective, polished face",
  },
  "soft-touch": {
    label: "Soft-touch",
    buttonNote: "Velvety or rubberized feel for premium button tops and grips.",
    look: "Slightly draggy, skin-like surface",
  },
  "light-texture": {
    label: "Light texture",
    buttonNote: "Subtle grain improves finger purchase without looking industrial.",
    look: "Fine grain / light stipple",
  },
  "heavy-grip": {
    label: "Heavy grip texture",
    buttonNote: "Aggressive grip for tools/outdoor UIs; can feel rough.",
    look: "Deep stipple or diamond grip",
  },
  ribbed: {
    label: "Ribbed",
    buttonNote: "Directional cues for sliders or long press zones.",
    look: "Parallel ridges",
  },
  dotted: {
    label: "Dotted / pill",
    buttonNote: "Tactile target for small keys; common on remotes.",
    look: "Raised dots or pill centers",
  },
  "orange-peel": {
    label: "Orange peel",
    buttonNote: "Soft diffuse texture that hides tooling marks on larger pads.",
    look: "Gentle pebbled skin",
  },
};

/** Shared educational guide rows for button hardness screening. */
export const BUTTON_HARDNESS_GUIDE = [
  {
    band: "30-40" as ShoreABandId,
    title: "Very soft press",
    examples: "Gel-like remote keys, ultra-soft mute buttons",
  },
  {
    band: "40-50" as ShoreABandId,
    title: "Soft consumer buttons",
    examples: "TV remotes, soft-touch power keys, thumb grips",
  },
  {
    band: "50-60" as ShoreABandId,
    title: "Everyday keypads",
    examples: "Appliance panels, calculator-style keys, light industrial HMI",
  },
  {
    band: "60-70" as ShoreABandId,
    title: "Firmer click / seals",
    examples: "Firmer keypad stops, many gaskets, durable button skirts",
  },
  {
    band: "70-80" as ShoreABandId,
    title: "Firm rubber",
    examples: "Feet, hard bumpers, stiff button surrounds",
  },
  {
    band: "80-90" as ShoreABandId,
    title: "Hard elastomer",
    examples: "Near-rigid rubber parts; less “squishy button” feel",
  },
];

export const ELASTOMER_GUIDE_DISCLAIMER =
  "Shore A bands and texture notes are educational screening aids for buttons, keypads, and soft-touch parts — not datasheet values or mold-texture guarantees. Always specify hardness, finish, and texture on the drawing/compound sheet.";
