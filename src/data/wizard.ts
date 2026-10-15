import type {
  BudgetId,
  EnvironmentId,
  FinishId,
  MaterialFamily,
  PriorityId,
  ShapeId,
  SizeId,
} from "./types";

export type CategoryId =
  | "consumer"
  | "industrial"
  | "electronics"
  | "packaging"
  | "other";

export type GeometryId =
  | "shell"
  | "solid"
  | "complex"
  | "tray"
  | "flexible"
  | "unsure";

export type StructuralId = "light" | "moderate" | "structural" | "impact";

/** Preferred material family for shortlist screening — or still exploring. */
export type MaterialFamilyPref = MaterialFamily | "unsure";

export type WizardPhaseId =
  | "basics"
  | "requirements"
  | "manufacturing"
  | "results";

export type WizardStepId =
  | "category"
  | "size"
  | "geometry"
  | "environment"
  | "materialFamily"
  | "structural"
  | "finish"
  | "quantity"
  | "budget"
  | "targetCost"
  | "priority"
  | "results";

export interface WizardState {
  category: CategoryId;
  size: SizeId;
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  geometry: GeometryId;
  environment: EnvironmentId;
  materialFamily: MaterialFamilyPref;
  structural: StructuralId;
  finish: FinishId;
  quantity: number;
  budget: BudgetId;
  targetUnitCost: number;
  priority: PriorityId;
}

export const defaultWizardState: WizardState = {
  category: "consumer",
  size: "small",
  lengthMm: 80,
  widthMm: 60,
  heightMm: 25,
  geometry: "shell",
  environment: "indoor",
  materialFamily: "plastic",
  structural: "moderate",
  finish: "standard",
  quantity: 500,
  budget: "1000-5000",
  targetUnitCost: 5,
  priority: "cost",
};

export const wizardPhases: {
  id: WizardPhaseId;
  label: string;
  stepIds: WizardStepId[];
}[] = [
  {
    id: "basics",
    label: "Product Basics",
    stepIds: ["category", "size", "geometry", "environment"],
  },
  {
    id: "requirements",
    label: "Material Preferences",
    stepIds: ["materialFamily", "structural", "finish"],
  },
  {
    id: "manufacturing",
    label: "Manufacturing Needs",
    stepIds: ["quantity", "budget", "targetCost", "priority"],
  },
  {
    id: "results",
    label: "Results",
    stepIds: ["results"],
  },
];

export const wizardSteps: {
  id: WizardStepId;
  phase: WizardPhaseId;
  title: string;
  prompt: string;
  why: string;
  nextLabel?: string;
}[] = [
  {
    id: "category",
    phase: "basics",
    title: "What kind of product are you making?",
    prompt:
      "Choose the closest category. This frames tradeoffs later — it does not invent material property data.",
    why: "Product category sets expectations for cosmetics, durability, and regulatory scrutiny. A consumer enclosure and an industrial fixture often share geometry but diverge on finish and performance.",
    nextLabel: "Next: Size & dimensions",
  },
  {
    id: "size",
    phase: "basics",
    title: "How large is the part?",
    prompt:
      "Pick a size band and refine approximate overall dimensions in millimeters.",
    why: "Size changes process fit and cost assumptions. Large parts may need multi-cavity rethinks, sheet sizes for thermoforming, or machine travel limits for CNC and printing.",
    nextLabel: "Next: Part geometry",
  },
  {
    id: "geometry",
    phase: "basics",
    title: "What does your product look like?",
    prompt:
      "Select the geometry that best matches your part. Shape is one of the strongest filters for process fit.",
    why: "Shape determines which processes are practical. Open shells often suit thermoforming; ribs, bosses, and snaps usually need injection molding; complex low-volume parts may favor additive methods.",
    nextLabel: "Next: Environment",
  },
  {
    id: "environment",
    phase: "basics",
    title: "Where will the product be used?",
    prompt: "Environment drives UV, moisture, and weathering considerations.",
    why: "Outdoor or harsh environments may need UV-stabilized grades or alternative polymers. Standard indoor plastics can chalk, fade, or embrittle outdoors without protection.",
    nextLabel: "Next: Material type",
  },
  {
    id: "materialFamily",
    phase: "requirements",
    title: "What type of material are you aiming for?",
    prompt:
      "Choose a material family to shortlist against. The planning model used to default to plastics — pick metal, elastomer, fabric, or composite when that is the intent.",
    why: "Material family is one of the strongest early filters. A gasket, a machined bracket, a speaker cloth, and a molded enclosure rarely share the same shortlist.",
    nextLabel: "Next: Structural needs",
  },
  {
    id: "structural",
    phase: "requirements",
    title: "What structural performance do you need?",
    prompt:
      "Describe load and toughness expectations at a high level — detailed FEA comes later with suppliers.",
    why: "Impact, stiffness, and load path influence both material family and process choice. Layered prints and formed shells behave differently from injection-molded engineering plastics.",
    nextLabel: "Next: Surface finish",
  },
  {
    id: "finish",
    phase: "requirements",
    title: "What cosmetic finish do you need?",
    prompt: "Appearance requirements affect process selection and secondary finishing cost.",
    why: "Premium cosmetics often push away from as-printed FDM surfaces and toward molded or carefully finished parts. Basic functional finishes keep more processes in play.",
    nextLabel: "Next: Quantity",
  },
  {
    id: "quantity",
    phase: "manufacturing",
    title: "How many units do you need?",
    prompt:
      "Production volume is the main lever between tooling investment and per-part cost.",
    why: "Low volumes favor flexible processes with little tooling. Higher volumes can justify molds that slash unit cost — if the design is stable.",
    nextLabel: "Next: Tooling budget",
  },
  {
    id: "budget",
    phase: "manufacturing",
    title: "What is your tooling / setup budget?",
    prompt: "Set an initial investment range for molds, fixtures, or setup.",
    why: "Tooling budget screens out high-investment processes early. Injection molds can win on unit cost but only if the setup spend fits your plan.",
    nextLabel: "Next: Target unit cost",
  },
  {
    id: "targetCost",
    phase: "manufacturing",
    title: "What unit cost are you aiming for?",
    prompt:
      "Enter a planning target per part. Results will flag options that miss this illustrative target.",
    why: "A unit-cost target helps compare candidates after tooling is amortized. It is a planning input, not a supplier quote.",
    nextLabel: "Next: Priorities",
  },
  {
    id: "priority",
    phase: "manufacturing",
    title: "What matters most right now?",
    prompt:
      "Your priority shapes how we explain tradeoffs on the results shortlist.",
    why: "Teams optimizing for lowest total cost, cosmetic quality, or design flexibility often shortlist the same candidates differently. Priority guides interpretation until a fuller ranking engine arrives.",
    nextLabel: "See results",
  },
  {
    id: "results",
    phase: "results",
    title: "Preliminary manufacturing shortlist",
    prompt:
      "Based on your brief, here is an explainable shortlist using the current planning model.",
    why: "This shortlist applies basic geometry, environment, finish, size, and budget screens to illustrative cost combinations. It is not engineering approval or a supplier quotation.",
  },
];

export const categoryOptions: {
  value: CategoryId;
  label: string;
  desc: string;
  examples: string;
}[] = [
  {
    value: "consumer",
    label: "Consumer product",
    desc: "Housings, gadgets, and everyday durables",
    examples: "Enclosures, appliances, accessories",
  },
  {
    value: "industrial",
    label: "Industrial / equipment",
    desc: "Fixtures, covers, and workhorse parts",
    examples: "Guards, brackets, machine covers",
  },
  {
    value: "electronics",
    label: "Electronics housing",
    desc: "Devices needing fit, finish, and toughness",
    examples: "Instrument cases, IoT shells",
  },
  {
    value: "packaging",
    label: "Packaging / display",
    desc: "Trays, blisters, and presentation parts",
    examples: "Trays, clamshells, displays",
  },
  {
    value: "other",
    label: "Other / exploring",
    desc: "Still defining the product category",
    examples: "Early concepts and prototypes",
  },
];

export const geometryOptions: {
  value: GeometryId;
  label: string;
  desc: string;
  examples: string;
  mapsTo: ShapeId;
}[] = [
  {
    value: "shell",
    label: "Shell / enclosure",
    desc: "Open-backed covers and housings",
    examples: "Casings, covers, housings",
    mapsTo: "shell",
  },
  {
    value: "solid",
    label: "Solid part",
    desc: "Chunkier mechanical components",
    examples: "Knobs, brackets, handles",
    mapsTo: "solid",
  },
  {
    value: "complex",
    label: "Complex geometry",
    desc: "Internal features, ribs, snaps, details",
    examples: "Gears, connectors, assemblies",
    mapsTo: "complex",
  },
  {
    value: "tray",
    label: "Thin sheet / tray",
    desc: "Shallow formed or panel-like parts",
    examples: "Panels, trays, shrouds",
    mapsTo: "tray",
  },
  {
    value: "flexible",
    label: "Flexible part",
    desc: "Soft or compliant geometries",
    examples: "Gaskets, seals, straps",
    mapsTo: "shell",
  },
  {
    value: "unsure",
    label: "Not sure yet",
    desc: "Explore options while geometry evolves",
    examples: "Early sketches and mockups",
    mapsTo: "shell",
  },
];

export const materialFamilyOptions: {
  value: MaterialFamilyPref;
  label: string;
  desc: string;
  examples: string;
}[] = [
  {
    value: "plastic",
    label: "Plastic",
    desc: "Molded, formed, or printed thermoplastic / thermoset parts",
    examples: "Enclosures, trays, clips, consumer housings",
  },
  {
    value: "metal",
    label: "Metal",
    desc: "Machined, fabricated, stamped, or cast metal parts",
    examples: "Brackets, plates, frames, hardware",
  },
  {
    value: "elastomer",
    label: "Elastomer / rubber",
    desc: "Soft, sealing, or button-like rubber compounds",
    examples: "Gaskets, O-rings, soft-touch keys, boots",
  },
  {
    value: "fabric",
    label: "Fabric / textile",
    desc: "Speaker cloth, softgoods, and textile constructions",
    examples: "Grille cloth, sleeves, covers, bags",
  },
  {
    value: "composite",
    label: "Composite",
    desc: "Fiber-reinforced or molded composite structures",
    examples: "Lightweight panels, covers, structural shells",
  },
  {
    value: "unsure",
    label: "Not sure yet",
    desc: "Compare across families while requirements are still open",
    examples: "Early concepts exploring plastic vs metal vs rubber",
  },
];

export const structuralOptions: {
  value: StructuralId;
  label: string;
  desc: string;
}[] = [
  {
    value: "light",
    label: "Light duty",
    desc: "Little structural load; mostly covers and cosmetics",
  },
  {
    value: "moderate",
    label: "Moderate use",
    desc: "Everyday handling and light fastening loads",
  },
  {
    value: "structural",
    label: "Structural",
    desc: "Carries meaningful load or stiffness requirements",
  },
  {
    value: "impact",
    label: "Impact / drop",
    desc: "Needs toughness for drops or abuse",
  },
];

export const sizeBandOptions: {
  value: SizeId;
  label: string;
  hint: string;
  defaults: { lengthMm: number; widthMm: number; heightMm: number };
}[] = [
  {
    value: "small",
    label: "Small (under 100 mm)",
    hint: "Handheld and compact parts",
    defaults: { lengthMm: 80, widthMm: 60, heightMm: 25 },
  },
  {
    value: "medium",
    label: "Medium (100–300 mm)",
    hint: "Typical enclosures and trays",
    defaults: { lengthMm: 180, widthMm: 120, heightMm: 40 },
  },
  {
    value: "large",
    label: "Large (over 300 mm)",
    hint: "Panels, larger covers, big fixtures",
    defaults: { lengthMm: 400, widthMm: 280, heightMm: 60 },
  },
];

export function phaseForStep(stepId: WizardStepId): WizardPhaseId {
  return wizardSteps.find((s) => s.id === stepId)?.phase ?? "basics";
}

export function stepIndex(stepId: WizardStepId): number {
  return wizardSteps.findIndex((s) => s.id === stepId);
}
