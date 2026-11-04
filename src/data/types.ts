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

/**
 * Educational Shore A screening bands for buttons / soft-touch —
 * not datasheet claims for a specific grade.
 */
export type ShoreABandId =
  | "30-40"
  | "40-50"
  | "50-60"
  | "60-70"
  | "70-80"
  | "80-90"
  | "wide";

export type ElastomerTextureId =
  | "smooth-matte"
  | "smooth-gloss"
  | "soft-touch"
  | "light-texture"
  | "heavy-grip"
  | "ribbed"
  | "dotted"
  | "orange-peel";

export type ButtonFit =
  | "limited"
  | "situational"
  | "common"
  | "preferred";

export interface ElastomerFeel {
  /** How readily typical compounds flex in soft-good / seal geometries. */
  flexibility: FlexibilityFeel;
  /** Soft-touch / squeeze pliability — compound-dependent. */
  pliability: PliabilityFeel;
  /** Relative recovery after squeeze (compression-set relevance). */
  recovery: RecoveryFeel;
  /** Family-level gasket / seal screening hint. */
  gasketFit: GasketFit;
  /** Educational Shore A band often discussed for this family. */
  shoreABand: ShoreABandId;
  /** Textures commonly tooled or finished for buttons / grips. */
  commonTextures: ElastomerTextureId[];
  /** Family-level soft-button / keypad screening hint. */
  buttonFit: ButtonFit;
  /** Hardness guidance without inventing datasheet values. */
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

/**
 * Status for simulation-oriented fields. Never treat educational text as a
 * verified FEA / SolidWorks library entry.
 */
export type SimPropertyStatus =
  | "unverified"
  | "educational"
  | "typical-range"
  | "grade-dependent";

export type SimPropertyKey =
  | "density"
  | "elasticModulus"
  | "poissonRatio"
  | "yieldStrength"
  | "ultimateStrength"
  | "thermalConductivity"
  | "cte"
  | "specificHeat";

export interface SimPropertyField {
  key: SimPropertyKey;
  label: string;
  /** Unit hint for when a datasheet value is later entered — not a claim. */
  unitHint: string;
  status: SimPropertyStatus;
  /** Display string — qualitative, relative, or “typical range — grade-dependent”. */
  display: string;
  note?: string;
}

export interface SimulationPropertySet {
  materialId: MaterialId;
  family: MaterialFamily;
  fields: SimPropertyField[];
  qualitativeSummary: string;
  designConsiderations: string[];
  disclaimer: string;
  solidworksNote: string;
}

export type DfmTopicId =
  | "wall-thickness"
  | "draft"
  | "bend-radius"
  | "bend-angle"
  | "hole-to-edge"
  | "ribs-bosses"
  | "corners-radii"
  | "undercuts"
  | "knit-gates"
  | "draw-depth"
  | "tool-access"
  | "springback"
  | "shrink-warp"
  | "general";

export type DfmRuleStatus = "educational" | "unverified";

export interface DfmRule {
  id: string;
  topic: DfmTopicId;
  title: string;
  guidance: string;
  status: DfmRuleStatus;
  /** When set, rule is especially relevant for these families. */
  families?: MaterialFamily[];
}

export interface DfmRuleSet {
  processId: ProcessId;
  materialId?: MaterialId;
  family?: MaterialFamily;
  rules: DfmRule[];
  disclaimer: string;
}

export const SIMULATION_PROPERTY_DISCLAIMER =
  "Unverified / educational screening only — not datasheet values and not ready to paste into FEA or SolidWorks without a grade-specific supplier sheet (condition, test method, and anisotropy matter).";

export const SOLIDWORKS_LIBRARY_NOTE =
  "SolidWorks and similar custom material libraries require grade-specific datasheet inputs. Family-level guidance here is for orientation only.";

export const DFM_DISCLAIMER =
  "Educational rules of thumb — not shop standards, mold-maker specs, or certified DFM. Confirm with tooling, process, and grade experts before release.";
