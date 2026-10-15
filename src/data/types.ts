export type ShapeId = "shell" | "tray" | "complex" | "solid";
export type SizeId = "small" | "medium" | "large";
export type EnvironmentId = "indoor" | "outdoor";
export type FinishId = "basic" | "standard" | "premium";
export type PriorityId = "cost" | "quality" | "flexibility";
export type BudgetId = "under1000" | "1000-5000" | "over5000";

/** Stable string ids — catalogs are open-ended after Milestone 3. */
export type MaterialId = string;
export type ProcessId = string;

export type MaterialFamily =
  | "plastic"
  | "metal"
  | "elastomer"
  | "composite"
  | "fabric";

/**
 * Educational specialty tags — usually grade- and certification-dependent.
 * Never treat as a datasheet claim or regulatory approval.
 */
export type MaterialTag =
  | "medical-grade"
  | "food-contact"
  | "chemical-resistant"
  | "hazloc-candidate"
  | "flame-retardant"
  | "uv-resistant"
  | "outdoor-capable"
  | "high-temp"
  | "wear-resistant"
  | "sterilizable"
  | "electrical-insulating"
  | "gasket-sealing"
  | "oil-fuel-resistant"
  | "acoustic"
  | "softgoods"
  | "breathable"
  | "stretch";

export type RelativeLevel = "low" | "moderate" | "high" | "very-high";

/** Qualitative elastomer “feel” for gasket / soft-good screening — not Shore numbers. */
export type FlexibilityFeel =
  | "stiff"
  | "moderate"
  | "flexible"
  | "very-flexible";

export type PliabilityFeel = "firm" | "medium" | "soft" | "very-soft";

export type RecoveryFeel = "limited" | "fair" | "good" | "excellent";

export type GasketFit = "limited" | "situational" | "common" | "preferred";

export interface ElastomerFeel {
  /** How readily typical compounds flex in soft-good / seal geometries. */
  flexibility: FlexibilityFeel;
  /** Soft-touch / squeeze pliability — compound-dependent. */
  pliability: PliabilityFeel;
  /** Relative recovery after squeeze (compression-set relevance). */
  recovery: RecoveryFeel;
  /** Family-level gasket / seal screening hint. */
  gasketFit: GasketFit;
  /** Hardness guidance without inventing Shore values. */
  hardnessGuidance: string;
  notes: string[];
}

export type FabricHand = "crisp" | "soft" | "plush" | "technical";
export type FabricDrape = "stiff" | "moderate" | "fluid";
export type FabricStretch = "none" | "limited" | "moderate" | "high";
export type FabricBreathability = "low" | "moderate" | "high";
export type AcousticOpenness = "closed" | "semi-open" | "open";

/** Qualitative fabric / textile feel for softgoods and speaker cloth. */
export interface FabricFeel {
  hand: FabricHand;
  drape: FabricDrape;
  stretch: FabricStretch;
  breathability: FabricBreathability;
  /** Relative acoustic openness for grille / speaker cloth screening. */
  acousticOpenness: AcousticOpenness;
  constructionGuidance: string;
  notes: string[];
}

/**
 * Confidence for library fields that are educational / relative rather than
 * datasheet-verified numbers.
 */
export type DataConfidence =
  | "qualitative"
  | "unverified"
  | "prototype-illustrative";

export interface MaterialProperties {
  /** Short qualitative characterization — not measured values. */
  summary: string;
  /** Relative / educational notes only. */
  notes: string[];
  confidence: DataConfidence;
  /** Explicit reminder shown in UI. */
  disclaimer: string;
}

export interface Material {
  id: MaterialId;
  name: string;
  full: string;
  family: MaterialFamily;
  desc: string;
  applications: string[];
  pros: string[];
  cons: string[];
  processes: ProcessId[];
  /** Relative resin/stock cost band — not a quote. */
  relativeCost: RelativeLevel;
  relativeCostConfidence: DataConfidence;
  properties: MaterialProperties;
  designConsiderations: string[];
  /** Key into local SVG illustration set. */
  illustration: MaterialFamily;
  /**
   * Specialty screening tags (medical, chemical, hazloc candidate, …).
   * Grade-dependent — verify certifications with suppliers.
   */
  tags: MaterialTag[];
  /** Present for elastomer / rubber families — qualitative feel only. */
  elastomerFeel?: ElastomerFeel;
  /** Present for fabric / textile families — softgoods & acoustic feel. */
  fabricFeel?: FabricFeel;
}

export interface Process {
  id: ProcessId;
  name: string;
  family: string;
  desc: string;
  best: string;
  pros: string[];
  cons: string[];
  steps: string[];
  /** Qualitative volume guidance — verify with suppliers. */
  typicalVolumes: string;
  tooling: string[];
  costDrivers: string[];
  dfm: string[];
  illustration: ProcessIllustrationId;
  confidence: DataConfidence;
}

export type ProcessIllustrationId =
  | "molding"
  | "forming"
  | "subtractive"
  | "sheet"
  | "casting"
  | "additive"
  | "deformation";

export interface CostCombination {
  id: string;
  material: MaterialId;
  process: ProcessId;
  setup: number;
  unit: number;
  fit: ShapeId[];
  name: string;
}

export interface AdvisorBrief {
  quantity: number;
  shape: ShapeId;
  size: SizeId;
  environment: EnvironmentId;
  finish: FinishId;
  priority: PriorityId;
  budget: BudgetId;
}

export interface EvaluatedOption extends CostCombination {
  mat: Material;
  proc: Process;
  total: number;
  per: number;
  cautions: string[];
  feasible: boolean;
}

export const PROPERTY_DISCLAIMER =
  "Qualitative / educational characterization only. Not datasheet values. Verify grades, conditions, and test methods with supplier documentation before design decisions.";

export const RELATIVE_COST_DISCLAIMER =
  "Relative cost band for planning education only — not a material price index or supplier quote.";
