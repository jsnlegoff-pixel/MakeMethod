import { getMaterial } from "./materials";
import { getProcess } from "./processes";
import type {
  FinishCompatibilityNote,
  FinishCompatibilitySet,
  FinishDefinition,
  FinishFit,
  MaterialFamily,
  MaterialId,
  ProcessId,
  SurfaceFinishId,
} from "./types";
import { FINISH_DISCLAIMER } from "./types";

export const FINISH_CATALOG: Record<SurfaceFinishId, FinishDefinition> = {
  anodize: {
    id: "anodize",
    name: "Anodizing",
    shortLabel: "Anodize",
    summary:
      "Electrochemical oxide on aluminum for wear, corrosion, and color — Type II/III and dye stacks vary.",
  },
  "powder-coat": {
    id: "powder-coat",
    name: "Powder coating",
    shortLabel: "Powder coat",
    summary:
      "Dry powder electrostatic coat, cured — durable color on metals; limited on many plastics.",
  },
  "wet-paint": {
    id: "wet-paint",
    name: "Wet paint / spray coat",
    shortLabel: "Wet paint",
    summary:
      "Liquid paint or lacquer systems — adhesion primers and bake cycles are grade-dependent.",
  },
  "plate-nickel": {
    id: "plate-nickel",
    name: "Nickel plating",
    shortLabel: "Ni plate",
    summary: "Electroless or electrolytic nickel for wear, corrosion, and base layers.",
  },
  "plate-chrome": {
    id: "plate-chrome",
    name: "Chrome plating",
    shortLabel: "Cr plate",
    summary: "Decorative or hard chrome stacks — usually over nickel on compatible metals.",
  },
  "plate-zinc": {
    id: "plate-zinc",
    name: "Zinc plating",
    shortLabel: "Zn plate",
    summary: "Sacrificial zinc on steels for corrosion protection; chromate seals vary.",
  },
  passivation: {
    id: "passivation",
    name: "Passivation",
    shortLabel: "Passivate",
    summary:
      "Chemical clean/passivate of stainless (and some other alloys) to restore chromium-rich surface.",
  },
  "bead-blast": {
    id: "bead-blast",
    name: "Bead / media blast",
    shortLabel: "Bead blast",
    summary: "Media blast for matte texture, oxide removal, or cosmetic uniformity.",
  },
  polish: {
    id: "polish",
    name: "Polish / buff",
    shortLabel: "Polish",
    summary: "Mechanical polish for gloss, reflection, or seal-surface prep.",
  },
  brush: {
    id: "brush",
    name: "Brushed / directional finish",
    shortLabel: "Brush",
    summary: "Directional abrasive finish common on stainless and aluminum cosmetics.",
  },
  "pad-print": {
    id: "pad-print",
    name: "Pad printing",
    shortLabel: "Pad print",
    summary: "Ink transfer for logos and legends on molded or machined surfaces.",
  },
  silkscreen: {
    id: "silkscreen",
    name: "Silkscreen / screen print",
    shortLabel: "Silkscreen",
    summary: "Screen-printed graphics on flat or gently curved panels and housings.",
  },
};

type FinishSeed = {
  finishId: SurfaceFinishId;
  fit: FinishFit;
  note: string;
};

/** Family defaults — educational, not certs. */
const FAMILY_FINISHES: Record<MaterialFamily, FinishSeed[]> = {
  metal: [
    {
      finishId: "powder-coat",
      fit: "compatible",
      note: "Common durable color on many fabricated metals after proper pretreatment.",
    },
    {
      finishId: "wet-paint",
      fit: "compatible",
      note: "Widely used with conversion coats / primers matched to the alloy.",
    },
    {
      finishId: "bead-blast",
      fit: "compatible",
      note: "Useful for matte cosmetics or oxide cleanup before coat/plate.",
    },
    {
      finishId: "polish",
      fit: "conditional",
      note: "Depends on alloy hardness and required Ra — plan labor and fixturing.",
    },
    {
      finishId: "brush",
      fit: "conditional",
      note: "Common cosmetic on stainless and aluminum; grain direction is a drawing callout.",
    },
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Works on coated or prepared metal faces; adhesion tests still required.",
    },
    {
      finishId: "silkscreen",
      fit: "conditional",
      note: "Best on flat panels; ink/cure must suit the topcoat.",
    },
  ],
  plastic: [
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Many resins paint well with adhesion promoters — grade and mold release matter.",
    },
    {
      finishId: "pad-print",
      fit: "compatible",
      note: "Standard for logos on housings when surface energy and ink are matched.",
    },
    {
      finishId: "silkscreen",
      fit: "compatible",
      note: "Common on flat lids and panels; texture depth affects ink laydown.",
    },
    {
      finishId: "bead-blast",
      fit: "conditional",
      note: "Can hide knit/flow marks or prep for paint — soft resins abrade quickly.",
    },
    {
      finishId: "polish",
      fit: "conditional",
      note: "Flame/vapor/mechanical polish is process-specific (e.g. acrylic, some AM).",
    },
    {
      finishId: "powder-coat",
      fit: "incompatible",
      note: "Typical powder cure temps exceed most thermoplastic heat limits — rare specialty systems only.",
    },
    {
      finishId: "anodize",
      fit: "incompatible",
      note: "Anodizing is an aluminum electrochemical process — not used on plastics.",
    },
    {
      finishId: "passivation",
      fit: "incompatible",
      note: "Passivation chemistries target stainless/metal oxide films — not plastics.",
    },
    {
      finishId: "plate-zinc",
      fit: "incompatible",
      note: "Zinc plating is for steels; plastics need different metallization stacks if plated at all.",
    },
  ],
  elastomer: [
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Possible on some TPU/silicone with primers — stretch and oil bloom hurt durability.",
    },
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Flexible coatings exist; adhesion and flex-crack are compound-specific.",
    },
    {
      finishId: "powder-coat",
      fit: "incompatible",
      note: "Powder cure and rigidity clash with elastomers.",
    },
    {
      finishId: "anodize",
      fit: "incompatible",
      note: "Not applicable to elastomers.",
    },
    {
      finishId: "plate-nickel",
      fit: "incompatible",
      note: "Not a standard elastomer finish path.",
    },
    {
      finishId: "passivation",
      fit: "incompatible",
      note: "Not applicable to elastomers.",
    },
  ],
  fabric: [
    {
      finishId: "silkscreen",
      fit: "conditional",
      note: "Textile inks/print methods exist — construction and finish chemistry decide.",
    },
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Limited to firmer panels/laminates; soft goods usually use other print methods.",
    },
    {
      finishId: "anodize",
      fit: "incompatible",
      note: "Not applicable to fabrics.",
    },
    {
      finishId: "powder-coat",
      fit: "incompatible",
      note: "Not a fabric process.",
    },
    {
      finishId: "plate-zinc",
      fit: "incompatible",
      note: "Not applicable to fabrics.",
    },
  ],
  composite: [
    {
      finishId: "wet-paint",
      fit: "compatible",
      note: "Gelcoat or paint systems are common after surface prep.",
    },
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Works on painted or sealed faces.",
    },
    {
      finishId: "silkscreen",
      fit: "conditional",
      note: "Flat panels screen well after seal/paint.",
    },
    {
      finishId: "bead-blast",
      fit: "conditional",
      note: "Used carefully for tooth before paint — avoid cutting fibers.",
    },
    {
      finishId: "anodize",
      fit: "incompatible",
      note: "Anodize does not apply to polymer-matrix composites.",
    },
    {
      finishId: "passivation",
      fit: "incompatible",
      note: "Not a composite finish.",
    },
  ],
};

/** Material-specific overlays (replace or add by finishId). */
const MATERIAL_FINISHES: Partial<Record<MaterialId, FinishSeed[]>> = {
  "al-6061": [
    {
      finishId: "anodize",
      fit: "compatible",
      note: "6061 anodizes well (Type II/III); dye and seal choices drive cosmetics and wear.",
    },
    {
      finishId: "powder-coat",
      fit: "compatible",
      note: "Common after clean/conversion coat — hang holes and Faraday cages matter on CNC parts.",
    },
    {
      finishId: "bead-blast",
      fit: "compatible",
      note: "Often used before anodize or as a matte cosmetic alone.",
    },
    {
      finishId: "brush",
      fit: "compatible",
      note: "Popular consumer cosmetic; specify grit/direction.",
    },
    {
      finishId: "plate-zinc",
      fit: "incompatible",
      note: "Zinc plate is a steel process — aluminum uses anodize/chem-film/powder instead.",
    },
    {
      finishId: "passivation",
      fit: "incompatible",
      note: "Stainless passivation chemistries are not the aluminum path (use chem film / anodize).",
    },
  ],
  "al-7075": [
    {
      finishId: "anodize",
      fit: "conditional",
      note: "7075 can anodize but copper-rich 7xxx grades are fussier than 6061 — confirm Type and dye with the finisher.",
    },
    {
      finishId: "powder-coat",
      fit: "compatible",
      note: "Viable with proper pretreatment; watch heat vs temper on thin parts.",
    },
    {
      finishId: "plate-zinc",
      fit: "incompatible",
      note: "Not the aluminum finish path.",
    },
    {
      finishId: "passivation",
      fit: "incompatible",
      note: "Not the aluminum finish path.",
    },
  ],
  "ss-304": [
    {
      finishId: "passivation",
      fit: "compatible",
      note: "Standard after fab/weld/machine to restore corrosion resistance (citric or nitric per spec).",
    },
    {
      finishId: "brush",
      fit: "compatible",
      note: "Common architectural/consumer look (e.g. #4).",
    },
    {
      finishId: "polish",
      fit: "compatible",
      note: "Mirror and food-contact polishes are routine — specify Ra.",
    },
    {
      finishId: "bead-blast",
      fit: "compatible",
      note: "Uniform matte; may need re-passivation afterward.",
    },
    {
      finishId: "powder-coat",
      fit: "conditional",
      note: "Used when color is required; stainless often left bare or brushed instead.",
    },
    {
      finishId: "anodize",
      fit: "incompatible",
      note: "Anodizing is for aluminum — stainless uses passivate/polish/coat.",
    },
    {
      finishId: "plate-zinc",
      fit: "incompatible",
      note: "Stainless is not typically zinc-plated.",
    },
  ],
  "ss-316": [
    {
      finishId: "passivation",
      fit: "compatible",
      note: "Specify passivation after machining/welding for chloride service expectations.",
    },
    {
      finishId: "polish",
      fit: "compatible",
      note: "Common for sanitary / marine cosmetics.",
    },
    {
      finishId: "brush",
      fit: "compatible",
      note: "Directional finishes are routine drawing callouts.",
    },
    {
      finishId: "anodize",
      fit: "incompatible",
      note: "Not an aluminum anodize process.",
    },
    {
      finishId: "plate-zinc",
      fit: "incompatible",
      note: "Not typical for 316.",
    },
  ],
  "carbon-steel": [
    {
      finishId: "plate-zinc",
      fit: "compatible",
      note: "Common corrosion protection for fabricated steel (clear/yellow chromate options).",
    },
    {
      finishId: "powder-coat",
      fit: "compatible",
      note: "Standard after phosphate/clean — control edges and weld spatter.",
    },
    {
      finishId: "wet-paint",
      fit: "compatible",
      note: "Primer + topcoat systems are ubiquitous.",
    },
    {
      finishId: "plate-nickel",
      fit: "conditional",
      note: "Used for wear/corrosion stacks — bath and thickness are application-specific.",
    },
    {
      finishId: "bead-blast",
      fit: "compatible",
      note: "Prep or cosmetic blast before coat.",
    },
    {
      finishId: "anodize",
      fit: "incompatible",
      note: "Anodize is aluminum-only.",
    },
    {
      finishId: "passivation",
      fit: "incompatible",
      note: "Passivation here means stainless-style chemistries — steel uses coat/plate instead.",
    },
  ],
  zinc: [
    {
      finishId: "plate-chrome",
      fit: "conditional",
      note: "Die-cast zinc often gets copper/nickel/chrome decorative stacks — porosity and prep matter.",
    },
    {
      finishId: "plate-nickel",
      fit: "conditional",
      note: "Common underlayer or standalone on zinc die cast.",
    },
    {
      finishId: "wet-paint",
      fit: "compatible",
      note: "Painted zinc castings are common with proper prep.",
    },
    {
      finishId: "powder-coat",
      fit: "conditional",
      note: "Possible with heat limits of the casting and alloy.",
    },
    {
      finishId: "anodize",
      fit: "incompatible",
      note: "Not an aluminum anodize process.",
    },
  ],
  brass: [
    {
      finishId: "polish",
      fit: "compatible",
      note: "Bright polish and clear coats are common cosmetics.",
    },
    {
      finishId: "plate-nickel",
      fit: "conditional",
      note: "Nickel (and chrome) plating used for wear/color — bath selection matters.",
    },
    {
      finishId: "plate-chrome",
      fit: "conditional",
      note: "Decorative chrome usually over nickel.",
    },
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Less common than polish/plate but viable with adhesion prep.",
    },
    {
      finishId: "anodize",
      fit: "incompatible",
      note: "Not aluminum anodizing.",
    },
    {
      finishId: "passivation",
      fit: "incompatible",
      note: "Not the stainless passivation path.",
    },
  ],
  copper: [
    {
      finishId: "polish",
      fit: "compatible",
      note: "Bright finishes tarnish without clear coat or plating.",
    },
    {
      finishId: "plate-nickel",
      fit: "conditional",
      note: "Nickel plating used for wear/appearance stacks.",
    },
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Possible; oxidation and adhesion need control.",
    },
    {
      finishId: "anodize",
      fit: "incompatible",
      note: "Not aluminum anodizing.",
    },
  ],
  "ti-6al4v": [
    {
      finishId: "anodize",
      fit: "conditional",
      note: "Titanium anodize exists for color/ID — different chemistry than aluminum Type II/III.",
    },
    {
      finishId: "bead-blast",
      fit: "compatible",
      note: "Common matte / prep finish.",
    },
    {
      finishId: "polish",
      fit: "conditional",
      note: "Labor-intensive; medical cosmetics are tightly specified.",
    },
    {
      finishId: "passivation",
      fit: "conditional",
      note: "Clean/passivate steps appear in some Ti specs — confirm chemistry with the finisher.",
    },
    {
      finishId: "plate-zinc",
      fit: "incompatible",
      note: "Not a Ti corrosion strategy.",
    },
  ],
  magnesium: [
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Magnesium needs careful conversion coat + paint for corrosion.",
    },
    {
      finishId: "powder-coat",
      fit: "conditional",
      note: "Used with proper pretreatment — corrosion risk if coating is damaged.",
    },
    {
      finishId: "anodize",
      fit: "conditional",
      note: "Specialty Mag anodize / conversion systems exist — not aluminum Type II by default.",
    },
    {
      finishId: "plate-zinc",
      fit: "incompatible",
      note: "Not the usual Mag path.",
    },
  ],
  abs: [
    {
      finishId: "wet-paint",
      fit: "compatible",
      note: "ABS is a classic paintable housing resin with adhesion promoters as needed.",
    },
    {
      finishId: "pad-print",
      fit: "compatible",
      note: "Very common for logos and legends.",
    },
    {
      finishId: "silkscreen",
      fit: "compatible",
      note: "Works on flat faces and many textured lids.",
    },
    {
      finishId: "plate-chrome",
      fit: "conditional",
      note: "Decorative chrome plating on ABS is a specialty electroless/electrolytic stack — design for plating early.",
    },
    {
      finishId: "plate-nickel",
      fit: "conditional",
      note: "Often part of ABS decorative plating stacks.",
    },
  ],
  pc: [
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "PC paints with care — solvent attack and stress cracking are grade/process risks.",
    },
    {
      finishId: "pad-print",
      fit: "compatible",
      note: "Common on clear/opaque PC parts with suitable inks.",
    },
    {
      finishId: "silkscreen",
      fit: "compatible",
      note: "Used on lenses and housings; ink must not craze the PC.",
    },
    {
      finishId: "polish",
      fit: "conditional",
      note: "Optical polish / vapor polish is specialty — not a generic shop step.",
    },
  ],
  pcabs: [
    {
      finishId: "wet-paint",
      fit: "compatible",
      note: "Often chosen when paintability and toughness both matter.",
    },
    {
      finishId: "pad-print",
      fit: "compatible",
      note: "Standard housing graphic process.",
    },
    {
      finishId: "silkscreen",
      fit: "compatible",
      note: "Common on appliance and electronics covers.",
    },
  ],
  pmma: [
    {
      finishId: "polish",
      fit: "compatible",
      note: "Acrylic polishes (mechanical / flame) for optics and edges.",
    },
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Back-paint and selective paint are common; solvent crazing is a risk.",
    },
    {
      finishId: "silkscreen",
      fit: "compatible",
      note: "Used on displays and lenses with acrylic-safe inks.",
    },
    {
      finishId: "pad-print",
      fit: "compatible",
      note: "Viable for legends on molded acrylic.",
    },
  ],
  nylon: [
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Moisture and surface energy make paint adhesion grade-dependent.",
    },
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Possible with primers; dye/pigment in resin is often preferred for color.",
    },
    {
      finishId: "bead-blast",
      fit: "conditional",
      note: "Used to dull gloss or prep — moisture conditioning still applies.",
    },
  ],
  pp: [
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Low surface energy — needs flame/plasma/primer systems for durable paint.",
    },
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Adhesion promoters usually required.",
    },
    {
      finishId: "silkscreen",
      fit: "conditional",
      note: "Same low-energy adhesion challenge as paint.",
    },
  ],
  hdpe: [
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Difficult adhesion — treat surface or use molded-in color.",
    },
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Needs surface treatment for durable ink.",
    },
  ],
  ldpe: [
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Soft, low-energy surface — coatings are specialty.",
    },
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Limited; treatment required.",
    },
  ],
  pom: [
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Acetal is notoriously hard to paint — prefer molded-in color or specialty pretreat.",
    },
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Adhesion is difficult; validate ink systems.",
    },
  ],
  asa: [
    {
      finishId: "wet-paint",
      fit: "compatible",
      note: "Outdoor ASA often painted or left molded-in color for UV.",
    },
    {
      finishId: "pad-print",
      fit: "compatible",
      note: "Standard for exterior legends when ink UV package is correct.",
    },
    {
      finishId: "silkscreen",
      fit: "compatible",
      note: "Common on outdoor housings.",
    },
  ],
  pvc: [
    {
      finishId: "wet-paint",
      fit: "conditional",
      note: "Rigid PVC can accept coatings; plasticizers in flexible PVC migrate and hurt adhesion.",
    },
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Works on many rigid profiles/parts with matched inks.",
    },
    {
      finishId: "silkscreen",
      fit: "conditional",
      note: "Used on cards and panels — ink must suit plasticizer level.",
    },
  ],
  nbr: [
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Marking possible on some compounds; oil swell affects durability.",
    },
    {
      finishId: "wet-paint",
      fit: "incompatible",
      note: "Not a practical durable finish for NBR seals/parts.",
    },
  ],
  silicone: [
    {
      finishId: "pad-print",
      fit: "conditional",
      note: "Silicone inks/primers exist for keypads — validate flex and wash.",
    },
    {
      finishId: "wet-paint",
      fit: "incompatible",
      note: "Conventional paints do not stick; use silicone-specific systems only if required.",
    },
  ],
};

/**
 * Process relevance — finishes not in the allow list are dropped for that process
 * (unless material marks them incompatible — those stay as warnings when relevant).
 */
const PROCESS_FINISH_ALLOW: Partial<Record<ProcessId, SurfaceFinishId[]>> = {
  cnc: [
    "anodize",
    "powder-coat",
    "wet-paint",
    "plate-nickel",
    "plate-chrome",
    "plate-zinc",
    "passivation",
    "bead-blast",
    "polish",
    "brush",
    "pad-print",
    "silkscreen",
  ],
  "sheet-metal": [
    "powder-coat",
    "wet-paint",
    "plate-zinc",
    "plate-nickel",
    "passivation",
    "bead-blast",
    "brush",
    "polish",
    "silkscreen",
    "pad-print",
    "anodize",
  ],
  stamping: [
    "powder-coat",
    "wet-paint",
    "plate-zinc",
    "plate-nickel",
    "passivation",
    "bead-blast",
    "brush",
  ],
  extrusion: [
    "anodize",
    "powder-coat",
    "wet-paint",
    "bead-blast",
    "brush",
    "polish",
    "pad-print",
    "silkscreen",
  ],
  "die-casting": [
    "powder-coat",
    "wet-paint",
    "plate-nickel",
    "plate-chrome",
    "bead-blast",
    "polish",
    "pad-print",
  ],
  "sand-casting": ["powder-coat", "wet-paint", "bead-blast", "polish"],
  "investment-casting": [
    "powder-coat",
    "wet-paint",
    "polish",
    "bead-blast",
    "plate-nickel",
  ],
  forging: ["powder-coat", "wet-paint", "bead-blast", "polish", "plate-zinc"],
  injection: [
    "wet-paint",
    "pad-print",
    "silkscreen",
    "bead-blast",
    "polish",
    "plate-chrome",
    "plate-nickel",
  ],
  blow: ["wet-paint", "pad-print", "silkscreen"],
  thermo: ["wet-paint", "pad-print", "silkscreen", "polish"],
  rotomold: ["wet-paint", "pad-print", "bead-blast"],
  rim: ["wet-paint", "pad-print", "silkscreen"],
  compression: ["wet-paint", "pad-print", "bead-blast"],
  fdm: ["wet-paint", "bead-blast", "polish", "pad-print", "silkscreen"],
  sla: ["wet-paint", "polish", "pad-print", "silkscreen", "bead-blast"],
  sls: ["bead-blast", "wet-paint", "pad-print", "silkscreen"],
  mjf: ["bead-blast", "wet-paint", "pad-print", "silkscreen"],
};

function mergeSeeds(
  family: MaterialFamily,
  materialId?: MaterialId
): Map<SurfaceFinishId, FinishSeed> {
  const map = new Map<SurfaceFinishId, FinishSeed>();
  for (const seed of FAMILY_FINISHES[family] ?? []) {
    map.set(seed.finishId, seed);
  }
  if (materialId) {
    for (const seed of MATERIAL_FINISHES[materialId] ?? []) {
      map.set(seed.finishId, seed);
    }
  }
  return map;
}

function toNote(
  processId: ProcessId,
  materialId: MaterialId | undefined,
  seed: FinishSeed
): FinishCompatibilityNote {
  return {
    id: `${processId}-${materialId ?? "any"}-${seed.finishId}`,
    finishId: seed.finishId,
    fit: seed.fit,
    note: seed.note,
    status: "educational",
  };
}

export function getFinishCompatibility(input: {
  processId: ProcessId;
  materialId?: MaterialId;
  family?: MaterialFamily;
}): FinishCompatibilitySet | null {
  const process = getProcess(input.processId);
  if (!process) return null;

  const material = input.materialId
    ? getMaterial(input.materialId)
    : undefined;
  const family = input.family ?? material?.family;
  if (!family) return null;

  const seeds = mergeSeeds(family, material?.id);
  const allow = PROCESS_FINISH_ALLOW[input.processId];

  const notes: FinishCompatibilityNote[] = [];
  for (const seed of seeds.values()) {
    if (allow && !allow.includes(seed.finishId)) {
      // Keep notable incompatibilities even if process rarely offers that finish
      if (seed.fit !== "incompatible") continue;
    }
    notes.push(toNote(input.processId, material?.id, seed));
  }

  // Process-specific educational nudges
  if (input.processId === "fdm" || input.processId === "sls" || input.processId === "mjf") {
    const hasBlast = notes.some((n) => n.finishId === "bead-blast");
    if (!hasBlast && (!allow || allow.includes("bead-blast"))) {
      notes.push(
        toNote(input.processId, material?.id, {
          finishId: "bead-blast",
          fit: "compatible",
          note: "Bead/media blast is a common as-printed cosmetic cleanup for powder/bead AM surfaces.",
        })
      );
    }
  }

  const compatible = notes.filter((n) => n.fit === "compatible");
  const conditional = notes.filter((n) => n.fit === "conditional");
  const incompatible = notes.filter((n) => n.fit === "incompatible");

  if (
    compatible.length + conditional.length + incompatible.length ===
    0
  ) {
    return null;
  }

  return {
    processId: input.processId,
    materialId: material?.id,
    family,
    compatible,
    conditional,
    incompatible,
    disclaimer: FINISH_DISCLAIMER,
  };
}

export function finishLabel(id: SurfaceFinishId): string {
  return FINISH_CATALOG[id]?.shortLabel ?? id;
}

export function finishName(id: SurfaceFinishId): string {
  return FINISH_CATALOG[id]?.name ?? id;
}

export function listFinishIds(): SurfaceFinishId[] {
  return Object.keys(FINISH_CATALOG) as SurfaceFinishId[];
}
