import { getMaterial } from "./materials";
import type {
  Material,
  MaterialFamily,
  MaterialId,
  SimPropertyField,
  SimPropertyKey,
  SimPropertyStatus,
  SimulationPropertySet,
} from "./types";
import {
  SIMULATION_PROPERTY_DISCLAIMER,
  SOLIDWORKS_LIBRARY_NOTE,
} from "./types";

const FIELD_META: Record<
  SimPropertyKey,
  { label: string; unitHint: string }
> = {
  density: {
    label: "Density",
    unitHint: "Datasheet units: g/cm³ or kg/m³",
  },
  elasticModulus: {
    label: "Elastic modulus (E)",
    unitHint: "Datasheet units: GPa or MPa (stiffness)",
  },
  poissonRatio: {
    label: "Poisson’s ratio (ν)",
    unitHint: "Dimensionless (often ~0.2–0.5)",
  },
  yieldStrength: {
    label: "Yield strength",
    unitHint: "Datasheet units: MPa — grade & temper matter",
  },
  ultimateStrength: {
    label: "Ultimate tensile strength (UTS)",
    unitHint: "Datasheet units: MPa — method matters",
  },
  thermalConductivity: {
    label: "Thermal conductivity",
    unitHint: "Datasheet units: W/(m·K)",
  },
  cte: {
    label: "CTE (thermal expansion)",
    unitHint: "Datasheet units: µm/(m·K) or 1/K",
  },
  specificHeat: {
    label: "Specific heat",
    unitHint: "Datasheet units: J/(kg·K)",
  },
};

type FamilyFieldDefaults = Record<
  SimPropertyKey,
  {
    status: SimPropertyStatus;
    display: string;
    note?: string;
  }
>;

/**
 * Family-level educational defaults — intentionally non-numeric so we never
 * invent FEA inputs. Material overrides may refine wording only.
 */
const FAMILY_DEFAULTS: Record<MaterialFamily, FamilyFieldDefaults> = {
  plastic: {
    density: {
      status: "varies-by-grade",
      display:
        "Not a single number — neat resins are usually lighter than metals; glass or mineral fill makes them denser.",
      note: "Use the grade datasheet density for mass and FEA; don’t average a family.",
    },
    elasticModulus: {
      status: "varies-by-grade",
      display:
        "Not a single number — plastics are much less stiff than steel or aluminum. Fiber-filled grades are stiffer than neat resin.",
      note: "Temperature, moisture, and strain rate can change E a lot. Enter the supplier E for your grade and condition.",
    },
    poissonRatio: {
      status: "grade-dependent",
      display:
        "Depends on the grade — many thermoplastics land near about 0.3–0.4, but that is only a screening hint.",
      note: "For FEA, copy ν from the datasheet (or a trusted library entry for that exact grade).",
    },
    yieldStrength: {
      status: "grade-dependent",
      display:
        "Depends on the grade — plastics don’t always publish “yield” the same way metals do (some use offset yield).",
      note: "Prefer full stress–strain data at your temperature and rate over a family guess.",
    },
    ultimateStrength: {
      status: "varies-by-grade",
      display:
        "Varies widely by grade and test method (dry vs conditioned, ASTM vs ISO).",
      note: "Copy UTS from the same datasheet/method you will use for allowables.",
    },
    thermalConductivity: {
      status: "educational",
      display:
        "Usually low compared with metals — heat moves slowly unless you pick a thermally conductive filled grade.",
      note: "Relative orientation tip only; enter k from the grade sheet for thermal FEA.",
    },
    cte: {
      status: "educational",
      display:
        "Often expands with heat more than metals — watch fits, overmolding, and warpage.",
      note: "Fiber-filled parts can expand differently along vs across flow. Use the datasheet CTE(s).",
    },
    specificHeat: {
      status: "unverified",
      display:
        "Not listed here — take specific heat from the grade datasheet or material library when you need it.",
    },
  },
  metal: {
    density: {
      status: "varies-by-grade",
      display:
        "Not a single number across metals — aluminum is light, steels and copper are heavier, titanium sits in between.",
      note: "Alloy density is usually stable; still use the alloy datasheet value in CAD/FEA.",
    },
    elasticModulus: {
      status: "varies-by-grade",
      display:
        "Stiffness follows the alloy family — steels are much stiffer than aluminum or magnesium.",
      note: "E changes less with temper than strength does, but still enter the alloy’s published E.",
    },
    poissonRatio: {
      status: "grade-dependent",
      display:
        "Depends on the alloy — many metals are near about 0.3; confirm before locking an FEA model.",
    },
    yieldStrength: {
      status: "grade-dependent",
      display:
        "Depends on alloy + temper/condition (e.g. T6 vs annealed). Family averages are not safe for FEA.",
      note: "Always match the product form and heat-treat state on the datasheet.",
    },
    ultimateStrength: {
      status: "grade-dependent",
      display:
        "Depends on alloy and condition — confirm temper / heat treat on the sheet you will use.",
    },
    thermalConductivity: {
      status: "educational",
      display:
        "Copper and aluminum move heat well; stainless is much lower — alloy datasheets decide the number.",
    },
    cte: {
      status: "educational",
      display:
        "Varies by alloy — important when metals meet plastics or other metals in a stack-up.",
    },
    specificHeat: {
      status: "unverified",
      display:
        "Not listed here — take specific heat from the alloy datasheet or library when needed.",
    },
  },
  elastomer: {
    density: {
      status: "varies-by-grade",
      display:
        "Not a single number — compound and fillers shift density; use the compound sheet.",
    },
    elasticModulus: {
      status: "educational",
      display:
        "Rubber/TPE response is usually nonlinear — a single small-strain E is a weak FEA start.",
      note: "Prelim analysis often needs a hyperelastic model (and test data), not one modulus cell.",
    },
    poissonRatio: {
      status: "educational",
      display:
        "Many soft compounds behave nearly incompressible — model choice matters as much as the number.",
      note: "Some workflows use ν ≈ 0.49 carefully; confirm with compound data and solver guidance.",
    },
    yieldStrength: {
      status: "educational",
      display:
        "Classic “yield like steel” often doesn’t apply — look at stress at elongation, tear, and compression set.",
    },
    ultimateStrength: {
      status: "grade-dependent",
      display:
        "Depends on the compound and tensile method — copy from the supplier sheet.",
    },
    thermalConductivity: {
      status: "educational",
      display:
        "Usually low; specialty thermally conductive compounds exist when heat paths matter.",
    },
    cte: {
      status: "educational",
      display:
        "Often expands more than metals — seal/gasket thermal fit can change with temperature.",
    },
    specificHeat: {
      status: "unverified",
      display:
        "Not listed here — take from the compound datasheet when thermal mass matters.",
    },
  },
  composite: {
    density: {
      status: "varies-by-grade",
      display:
        "Not a single number — fiber type, resin, and fiber volume fraction set density.",
    },
    elasticModulus: {
      status: "grade-dependent",
      display:
        "Direction-dependent — you need the laminate/schedule, not one isotropic E.",
      note: "Entering a single E without orientation context will mislead FEA.",
    },
    poissonRatio: {
      status: "grade-dependent",
      display:
        "Depends on the laminate — get ν (and coupling terms) from coupon or supplier data.",
    },
    yieldStrength: {
      status: "educational",
      display:
        "Failure modes differ (fiber, matrix, interface) — “yield” may not map like metals.",
      note: "Use allowables that match the layup and load case.",
    },
    ultimateStrength: {
      status: "grade-dependent",
      display:
        "Depends on layup, process, and fiber fraction — verify orientation before analysis.",
    },
    thermalConductivity: {
      status: "educational",
      display:
        "Often different along vs across fibers — resin- vs fiber-dominated paths.",
    },
    cte: {
      status: "educational",
      display:
        "Strongly direction-dependent with fiber orientation — use laminate CTEs, not a family guess.",
    },
    specificHeat: {
      status: "unverified",
      display:
        "Not listed here — take from the system datasheet or coupon tests when needed.",
    },
  },
  fabric: {
    density: {
      status: "educational",
      display:
        "Softgoods usually quote areal density (g/m²), not a solid bulk density.",
      note: "Bulk density depends on construction, loft, and any laminate layers.",
    },
    elasticModulus: {
      status: "educational",
      display:
        "Not one isotropic E — warp, weft, and bias behave differently; coatings change response.",
      note: "Use fabric/orthotropic models and construction data, not a plastic-style E cell.",
    },
    poissonRatio: {
      status: "unverified",
      display:
        "Not listed here — fabric Poisson effects are construction-specific.",
    },
    yieldStrength: {
      status: "educational",
      display:
        "Think tensile / tear ratings for the construction — not metal-style yield.",
    },
    ultimateStrength: {
      status: "grade-dependent",
      display:
        "Depends on the fabric construction — use tensile and tear datasheets.",
    },
    thermalConductivity: {
      status: "educational",
      display:
        "Usually low; loft and trapped air often matter more than the fiber alone.",
    },
    cte: {
      status: "educational",
      display:
        "Fiber + coating dependent; humidity can matter as much as temperature for many textiles.",
    },
    specificHeat: {
      status: "unverified",
      display:
        "Not listed here — rarely the first softgoods screening input.",
    },
  },
};

/** Optional material-specific wording refinements (still non-numeric). */
const MATERIAL_NOTES: Partial<
  Record<
    MaterialId,
    Partial<
      Record<
        SimPropertyKey,
        { display?: string; note?: string; status?: SimPropertyStatus }
      >
    >
  >
> = {
  "al-6061": {
    elasticModulus: {
      status: "educational",
      display:
        "Aluminum is much less stiff than steel — still enter E from the alloy/temper datasheet.",
    },
    yieldStrength: {
      status: "grade-dependent",
      display:
        "Depends on temper (e.g. T6 vs annealed) — do not assume T6 just because the alloy is 6061.",
    },
  },
  "al-7075": {
    yieldStrength: {
      status: "grade-dependent",
      display:
        "High-strength aluminum — yield still depends on temper and product form.",
    },
  },
  "ss-304": {
    thermalConductivity: {
      status: "educational",
      display:
        "Stainless moves heat less readily than carbon steel or aluminum — use the alloy sheet for k.",
    },
  },
  "ss-316": {
    thermalConductivity: {
      status: "educational",
      display:
        "Same stainless class idea as 304 for screening — confirm k on the alloy datasheet.",
    },
  },
  "carbon-steel": {
    elasticModulus: {
      status: "educational",
      display:
        "Carbon steels share a similar stiffness family — strength still depends on grade and condition.",
    },
  },
  "ti-6al4v": {
    density: {
      status: "educational",
      display:
        "Titanium density sits between aluminum and steel — use the alloy datasheet value in FEA.",
    },
  },
  copper: {
    thermalConductivity: {
      status: "educational",
      display:
        "Copper is among the highest thermal conductors in common metals — still copy k from the sheet.",
    },
  },
  peek: {
    elasticModulus: {
      status: "educational",
      display:
        "High-performance thermoplastic — filled grades get much stiffer than neat PEEK; use the grade sheet.",
    },
  },
  nylon: {
    elasticModulus: {
      status: "grade-dependent",
      display:
        "Dry vs moisture-conditioned nylon can feel very different in stiffness — match the datasheet state.",
    },
  },
  silicone: {
    elasticModulus: {
      status: "educational",
      display:
        "Soft, hyperelastic response — a single E cell is a weak FEA start; use compound test data.",
    },
  },
  cfrp: {
    elasticModulus: {
      status: "grade-dependent",
      display:
        "Fiber direction dominates — enter the laminate stack, not one isotropic E.",
    },
  },
  gfrp: {
    elasticModulus: {
      status: "grade-dependent",
      display:
        "Glass-fiber composites — orientation and fiber volume fraction control stiffness.",
    },
  },
};

const FIELD_ORDER: SimPropertyKey[] = [
  "density",
  "elasticModulus",
  "poissonRatio",
  "yieldStrength",
  "ultimateStrength",
  "thermalConductivity",
  "cte",
  "specificHeat",
];

function buildFields(material: Material): SimPropertyField[] {
  const familyDefaults = FAMILY_DEFAULTS[material.family];
  const overrides = MATERIAL_NOTES[material.id] ?? {};

  return FIELD_ORDER.map((key) => {
    const meta = FIELD_META[key];
    const base = familyDefaults[key];
    const over = overrides[key];
    return {
      key,
      label: meta.label,
      unitHint: meta.unitHint,
      status: over?.status ?? base.status,
      display: over?.display ?? base.display,
      note: over?.note ?? base.note,
    };
  });
}

export function getSimulationProperties(
  materialOrId: Material | MaterialId
): SimulationPropertySet | null {
  const material =
    typeof materialOrId === "string"
      ? getMaterial(materialOrId)
      : materialOrId;
  if (!material) return null;

  return {
    materialId: material.id,
    family: material.family,
    fields: buildFields(material),
    qualitativeSummary: material.properties.summary,
    designConsiderations: material.designConsiderations,
    disclaimer: SIMULATION_PROPERTY_DISCLAIMER,
    solidworksNote: SOLIDWORKS_LIBRARY_NOTE,
  };
}

/** Plain-language badge text for the UI. */
export function simStatusLabel(status: SimPropertyStatus): string {
  switch (status) {
    case "unverified":
      return "Not listed here";
    case "educational":
      return "Relative guidance";
    case "varies-by-grade":
    case "typical-range":
      return "No single number";
    case "grade-dependent":
      return "Depends on grade";
  }
}

/** Short tooltip-style explainer for status badges. */
export function simStatusExplainer(status: SimPropertyStatus): string {
  switch (status) {
    case "unverified":
      return "We don’t publish a value on this page — use a datasheet.";
    case "educational":
      return "Orientation tip only — not a number to paste into FEA.";
    case "varies-by-grade":
    case "typical-range":
      return "Values differ across common grades/suppliers — not one FEA input.";
    case "grade-dependent":
      return "Pick the exact grade (and condition) before analysis.";
  }
}
