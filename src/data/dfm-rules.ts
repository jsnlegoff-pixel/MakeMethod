import { getMaterial } from "./materials";
import { getProcess } from "./processes";
import type {
  DfmRule,
  DfmRuleSet,
  DfmTopicId,
  MaterialFamily,
  MaterialId,
  ProcessId,
} from "./types";
import { DFM_DISCLAIMER } from "./types";

type ProcessRuleSeed = Omit<DfmRule, "id"> & { idSuffix: string };

/** Process-level educational DFM seeds — not shop standards. */
const PROCESS_RULES: Record<string, ProcessRuleSeed[]> = {
  injection: [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Wall thickness",
      guidance:
        "Aim for uniform walls; abrupt thick-to-thin transitions invite sink, warp, and long cycle times. Typical commodity walls are often discussed in the ~1–3 mm band — grade, flow, and cosmetics decide.",
      status: "educational",
      families: ["plastic"],
    },
    {
      idSuffix: "draft",
      topic: "draft",
      title: "Draft for ejection",
      guidance:
        "Add draft on shutoff and textured surfaces. Textured cavities usually need more draft than polished ones. Confirm with the mold maker for the texture depth.",
      status: "educational",
      families: ["plastic", "elastomer"],
    },
    {
      idSuffix: "ribs",
      topic: "ribs-bosses",
      title: "Ribs and bosses",
      guidance:
        "Keep ribs thinner than adjoining walls to limit sink; radius rib roots; avoid thick bosses — core them and stand off from cosmetic faces when possible.",
      status: "educational",
      families: ["plastic"],
    },
    {
      idSuffix: "corners",
      topic: "corners-radii",
      title: "Corners and radii",
      guidance:
        "Internal sharp corners concentrate stress and hinder fill. Use generous internal radii relative to wall thickness where cosmetics allow.",
      status: "educational",
    },
    {
      idSuffix: "gates",
      topic: "knit-gates",
      title: "Gates and knit lines",
      guidance:
        "Place gates and anticipate knit lines away from high-stress or Class-A cosmetic zones. Multi-gate fills need weld-line strength checks.",
      status: "educational",
      families: ["plastic"],
    },
    {
      idSuffix: "undercuts",
      topic: "undercuts",
      title: "Undercuts and side actions",
      guidance:
        "Undercuts drive slides, lifters, or collapsible cores — cost and maintenance rise quickly. Prefer design-outs when volumes are modest.",
      status: "educational",
    },
  ],
  rim: [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Walls and flow",
      guidance:
        "Design for reactive flow and demold; very thin sections may fill poorly. Confirm chemistry-specific windows with the molder.",
      status: "educational",
    },
    {
      idSuffix: "ribs",
      topic: "ribs-bosses",
      title: "Ribs and stiffeners",
      guidance:
        "Stiffening ribs are common on large covers — plan knit/flow and trim access early.",
      status: "educational",
    },
    {
      idSuffix: "draft",
      topic: "draft",
      title: "Draft and demold",
      guidance:
        "Provide draft and clearance for demolding large skins; cosmetic Class targets drive surface systems.",
      status: "educational",
    },
  ],
  compression: [
    {
      idSuffix: "flow",
      topic: "knit-gates",
      title: "Charge and knit lines",
      guidance:
        "Charge placement controls knit lines and fiber orientation in SMC/BMC — review structural load paths with the processor.",
      status: "educational",
      families: ["composite", "elastomer"],
    },
    {
      idSuffix: "flash",
      topic: "general",
      title: "Flash and trim",
      guidance:
        "Expect flash/trim operations; design edges that can be cleaned without wrecking cosmetics or seals.",
      status: "educational",
    },
    {
      idSuffix: "draft",
      topic: "draft",
      title: "Draft",
      guidance:
        "Draft aids ejection of cured parts; deep draws and thick sections need process review.",
      status: "educational",
    },
  ],
  blow: [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Wall distribution",
      guidance:
        "Corners and deep features thin first. Design for acceptable min wall after blow; avoid abrupt thickness demands.",
      status: "educational",
      families: ["plastic"],
    },
    {
      idSuffix: "draft",
      topic: "draft",
      title: "Draft and pinch-offs",
      guidance:
        "Provide draft and plan pinch-off flash. Handles and recesses need blowability reviews.",
      status: "educational",
      families: ["plastic"],
    },
  ],
  rotomold: [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Wall build-up",
      guidance:
        "Walls grow from powder sintering — sharp internal corners and thin ribs are hard. Prefer generous radii and simple outer forms.",
      status: "educational",
      families: ["plastic"],
    },
    {
      idSuffix: "corners",
      topic: "corners-radii",
      title: "Radii",
      guidance:
        "Large internal and external radii improve powder flow and strength versus knife edges.",
      status: "educational",
    },
  ],
  thermo: [
    {
      idSuffix: "draw",
      topic: "draw-depth",
      title: "Draw depth and thinning",
      guidance:
        "Deep draws thin sheet dramatically. Use draft, radii, and plug assists thoughtfully; validate min wall after forming.",
      status: "educational",
      families: ["plastic"],
    },
    {
      idSuffix: "draft",
      topic: "draft",
      title: "Draft",
      guidance:
        "Draft helps strip formed parts from molds/tools; textured or undercut features complicate release.",
      status: "educational",
      families: ["plastic"],
    },
    {
      idSuffix: "corners",
      topic: "corners-radii",
      title: "Radii vs sheet thickness",
      guidance:
        "Inside radii that are too tight relative to sheet thickness wrinkle or thin. Scale radii with gauge.",
      status: "educational",
      families: ["plastic"],
    },
  ],
  cnc: [
    {
      idSuffix: "access",
      topic: "tool-access",
      title: "Tool access",
      guidance:
        "Every face needs cutter reach. Deep pockets, skinny walls, and tiny internal radii drive cost and chatter.",
      status: "educational",
    },
    {
      idSuffix: "corners",
      topic: "corners-radii",
      title: "Internal corner radii",
      guidance:
        "Internal corners cannot be sharper than the cutter radius. Match fillet to practical end-mill sizes.",
      status: "educational",
    },
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Thin walls",
      guidance:
        "Very thin walls deflect under cutting forces — especially in plastics and aluminum. Add stiffening or increase thickness.",
      status: "educational",
    },
    {
      idSuffix: "holes",
      topic: "hole-to-edge",
      title: "Holes and edge distance",
      guidance:
        "Keep holes a practical distance from edges and each other to avoid breakout; deep small holes need pecking or alternate ops.",
      status: "educational",
    },
  ],
  "sheet-metal": [
    {
      idSuffix: "bend-r",
      topic: "bend-radius",
      title: "Bend radius",
      guidance:
        "Inside bend radius is often discussed as a multiple of sheet thickness — alloy and temper set the safe floor. Confirm with the fab shop.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "bend-a",
      topic: "bend-angle",
      title: "Bend angle and relief",
      guidance:
        "Plan bend sequence, relief notches, and feature distance from bend lines so holes and slots do not distort.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "hole",
      topic: "hole-to-edge",
      title: "Hole-to-edge / hole-to-bend",
      guidance:
        "Keep punched/laser holes a respectful distance from edges and bend lines (rules of thumb often cite ~1–2× thickness or more — verify).",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "spring",
      topic: "springback",
      title: "Springback",
      guidance:
        "High-strength and stainless sheets spring back more. Expect process compensation rather than CAD-perfect angles.",
      status: "educational",
      families: ["metal"],
    },
  ],
  stamping: [
    {
      idSuffix: "bend-r",
      topic: "bend-radius",
      title: "Form radii",
      guidance:
        "Stamp form radii and draw beads must match blank thickness and alloy ductility. Tight radii risk splits.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "hole",
      topic: "hole-to-edge",
      title: "Pierce-to-edge",
      guidance:
        "Pierced holes need edge distance for die strength and part integrity. Confirm with the die designer.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "spring",
      topic: "springback",
      title: "Springback and wrinkle",
      guidance:
        "Control binder force and addendum; springback and wrinkling are process-tuned, not CAD-fixed.",
      status: "educational",
      families: ["metal"],
    },
  ],
  extrusion: [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Wall uniformity",
      guidance:
        "Keep walls as uniform as practical; extreme thick/thin junctions are hard to extrude and cool evenly.",
      status: "educational",
    },
    {
      idSuffix: "corners",
      topic: "corners-radii",
      title: "Tongue ratios and corners",
      guidance:
        "Deep narrow channels and sharp internal corners challenge die strength and metal/polymer flow — round and balance sections.",
      status: "educational",
    },
    {
      idSuffix: "general",
      topic: "general",
      title: "Hollows and voids",
      guidance:
        "Hollow profiles need ports and die complexity. Review with the extruder early for aluminum or plastic dies.",
      status: "educational",
    },
  ],
  "die-casting": [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Wall thickness",
      guidance:
        "Prefer uniform walls; thick bosses sink and porosity risk rises. Core out heavy masses where possible.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "draft",
      topic: "draft",
      title: "Draft",
      guidance:
        "Draft on cavity and core sides aids ejection; textured surfaces need more. Confirm with the die caster.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "ribs",
      topic: "ribs-bosses",
      title: "Ribs and fillets",
      guidance:
        "Use ribs for stiffness instead of bulk; generous fillets reduce hot spots and cracks.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "undercuts",
      topic: "undercuts",
      title: "Undercuts / slides",
      guidance:
        "Side actions add die cost. Design out undercuts when volumes do not justify them.",
      status: "educational",
      families: ["metal"],
    },
  ],
  "sand-casting": [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Section thickness",
      guidance:
        "Avoid abrupt section changes that create hot spots. Machine critical faces; as-cast tolerances are coarser.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "draft",
      topic: "draft",
      title: "Pattern draft",
      guidance:
        "Provide draft for pattern withdrawal; undercuts need cores — cost and lead time rise.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "corners",
      topic: "corners-radii",
      title: "Fillets",
      guidance:
        "Generous fillets reduce stress and improve mold fill versus sharp internal corners.",
      status: "educational",
      families: ["metal"],
    },
  ],
  "investment-casting": [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Walls and gates",
      guidance:
        "Thin walls are possible but need process capability review. Plan gates/risers with the foundry.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "corners",
      topic: "corners-radii",
      title: "Radii and detail",
      guidance:
        "Fine detail is a strength of investment casting — still avoid knife edges that freeze off.",
      status: "educational",
      families: ["metal"],
    },
  ],
  forging: [
    {
      idSuffix: "draft",
      topic: "draft",
      title: "Draft and parting",
      guidance:
        "Forging draft and parting lines are process-driven. Machine datums after forge when precision matters.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "corners",
      topic: "corners-radii",
      title: "Fillet and corner radii",
      guidance:
        "Generous forge radii aid flow; sharp external corners and thin webs are risk areas.",
      status: "educational",
      families: ["metal"],
    },
    {
      idSuffix: "grain",
      topic: "general",
      title: "Grain flow",
      guidance:
        "Align critical stress with expected grain flow; discuss flash and trim planes with the forge shop.",
      status: "educational",
      families: ["metal"],
    },
  ],
  fdm: [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Walls and perimeters",
      guidance:
        "Design walls as multiples of extrusion width when possible. Thin single-bead walls are fragile.",
      status: "educational",
      families: ["plastic"],
    },
    {
      idSuffix: "overhang",
      topic: "general",
      title: "Overhangs and supports",
      guidance:
        "Steep overhangs need supports or redesign. Orient for strength along beads, not across layer lines.",
      status: "educational",
    },
    {
      idSuffix: "holes",
      topic: "hole-to-edge",
      title: "Holes and clearances",
      guidance:
        "Printed holes often undersize — add clearance or plan reaming. Keep features away from thin edges.",
      status: "educational",
    },
  ],
  sla: [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Min walls",
      guidance:
        "Resin printers can do fine walls, but brittle grades crack if too thin. Confirm material min-feature guides.",
      status: "educational",
      families: ["plastic"],
    },
    {
      idSuffix: "drain",
      topic: "general",
      title: "Drain holes and cups",
      guidance:
        "Cuped volumes trap resin — add drain/vent holes. Orient to minimize supports on cosmetics.",
      status: "educational",
    },
  ],
  sls: [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Wall thickness",
      guidance:
        "Powder-bed nylons need practical min walls for strength and powder removal. Avoid sealed hollows without escape holes.",
      status: "educational",
      families: ["plastic"],
    },
    {
      idSuffix: "powder",
      topic: "general",
      title: "Powder escape",
      guidance:
        "Design escape holes for trapped powder in cavities. Sharp internal corners are less critical than in machining.",
      status: "educational",
    },
  ],
  mjf: [
    {
      idSuffix: "wall",
      topic: "wall-thickness",
      title: "Wall thickness",
      guidance:
        "Similar powder-bed discipline as SLS — practical min walls and powder escape paths.",
      status: "educational",
      families: ["plastic"],
    },
    {
      idSuffix: "powder",
      topic: "general",
      title: "Cavities",
      guidance:
        "Provide powder removal paths for hollow or lattice features.",
      status: "educational",
    },
  ],
};

/** Extra pair hints when a family meets a process. */
const PAIR_HINTS: Array<{
  processId: ProcessId;
  family: MaterialFamily;
  rule: ProcessRuleSeed;
}> = [
  {
    processId: "injection",
    family: "elastomer",
    rule: {
      idSuffix: "flash-elastomer",
      topic: "general",
      title: "Elastomer flash & shutoffs",
      guidance:
        "Rubber/TPE molds need careful shutoffs; expect deflash planning. Shrink and parting cosmetics are compound-specific.",
      status: "educational",
      families: ["elastomer"],
    },
  },
  {
    processId: "injection",
    family: "plastic",
    rule: {
      idSuffix: "shrink-plastic",
      topic: "shrink-warp",
      title: "Shrink and warp",
      guidance:
        "Account for grade shrink rates and glass-filled anisotropy in tolerances and flatness callouts.",
      status: "educational",
      families: ["plastic"],
    },
  },
  {
    processId: "thermo",
    family: "plastic",
    rule: {
      idSuffix: "sheet-gauge",
      topic: "wall-thickness",
      title: "Starting sheet gauge",
      guidance:
        "Finished min wall ≈ starting gauge minus draw thinning — pick gauge from the deepest draw, not the CAD nominal alone.",
      status: "educational",
      families: ["plastic"],
    },
  },
  {
    processId: "sheet-metal",
    family: "metal",
    rule: {
      idSuffix: "grain",
      topic: "bend-radius",
      title: "Bend vs grain",
      guidance:
        "Bending parallel vs across grain changes crack risk on some tempers — call out grain when it matters.",
      status: "educational",
      families: ["metal"],
    },
  },
  {
    processId: "cnc",
    family: "plastic",
    rule: {
      idSuffix: "plastic-heat",
      topic: "tool-access",
      title: "Heat and chip load (plastics)",
      guidance:
        "Plastics melt/smear if feeds/speeds are wrong; leave stock for cosmetic faces and avoid hair-thin ribs.",
      status: "educational",
      families: ["plastic"],
    },
  },
  {
    processId: "cnc",
    family: "metal",
    rule: {
      idSuffix: "metal-fixturing",
      topic: "tool-access",
      title: "Fixturing and datums",
      guidance:
        "Define machine datums early; thin aluminum walls need support to hold tolerance.",
      status: "educational",
      families: ["metal"],
    },
  },
  {
    processId: "compression",
    family: "composite",
    rule: {
      idSuffix: "fiber",
      topic: "general",
      title: "Fiber orientation",
      guidance:
        "Structural allowables follow fiber orientation from charge/flow — align design intent with process reality.",
      status: "educational",
      families: ["composite"],
    },
  },
];

const TOPIC_LABELS: Record<DfmTopicId, string> = {
  "wall-thickness": "Wall thickness",
  draft: "Draft",
  "bend-radius": "Bend radius",
  "bend-angle": "Bend angle",
  "hole-to-edge": "Hole-to-edge",
  "ribs-bosses": "Ribs & bosses",
  "corners-radii": "Corners & radii",
  undercuts: "Undercuts",
  "knit-gates": "Gates & knit lines",
  "draw-depth": "Draw depth",
  "tool-access": "Tool access",
  springback: "Springback",
  "shrink-warp": "Shrink & warp",
  general: "General",
};

function toRule(processId: ProcessId, seed: ProcessRuleSeed): DfmRule {
  return {
    id: `${processId}-${seed.idSuffix}`,
    topic: seed.topic,
    title: seed.title,
    guidance: seed.guidance,
    status: seed.status,
    ...(seed.families ? { families: seed.families } : {}),
  };
}

function filterForFamily(
  rules: DfmRule[],
  family?: MaterialFamily
): DfmRule[] {
  if (!family) return rules;
  return rules.filter(
    (r) => !r.families || r.families.length === 0 || r.families.includes(family)
  );
}

export function getDfmRules(input: {
  processId: ProcessId;
  materialId?: MaterialId;
  family?: MaterialFamily;
}): DfmRuleSet | null {
  const process = getProcess(input.processId);
  if (!process) return null;

  const material = input.materialId
    ? getMaterial(input.materialId)
    : undefined;
  const family = input.family ?? material?.family;

  const seeds = PROCESS_RULES[input.processId] ?? [];
  const base = seeds.map((s) => toRule(input.processId, s));

  const pairExtras = PAIR_HINTS.filter(
    (h) =>
      h.processId === input.processId && (!family || h.family === family)
  ).map((h) => toRule(input.processId, h.rule));

  /** Fall back to legacy process.dfm strings if no structured seeds yet. */
  const legacy: DfmRule[] =
    base.length === 0
      ? process.dfm.map((guidance, i) => ({
          id: `${input.processId}-legacy-${i}`,
          topic: "general" as const,
          title: "Process note",
          guidance,
          status: "educational" as const,
        }))
      : [];

  const merged = filterForFamily([...base, ...pairExtras, ...legacy], family);

  return {
    processId: input.processId,
    materialId: material?.id,
    family,
    rules: merged,
    disclaimer: DFM_DISCLAIMER,
  };
}

export function dfmTopicLabel(topic: DfmTopicId): string {
  return TOPIC_LABELS[topic];
}

export function listProcessIdsWithDfm(): ProcessId[] {
  return Object.keys(PROCESS_RULES);
}
