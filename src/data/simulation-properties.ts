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
  density: { label: "Density", unitHint: "g/cm³ or kg/m³" },
  elasticModulus: {
    label: "Elastic modulus (E)",
    unitHint: "GPa or MPa",
  },
  poissonRatio: { label: "Poisson’s ratio", unitHint: "dimensionless" },
  yieldStrength: {
    label: "Yield strength",
    unitHint: "MPa (grade- & condition-dependent)",
  },
  ultimateStrength: {
    label: "Ultimate tensile strength (UTS)",
    unitHint: "MPa (grade- & condition-dependent)",
  },
  thermalConductivity: {
    label: "Thermal conductivity",
    unitHint: "W/(m·K)",
  },
  cte: {
    label: "CTE (coeff. of thermal expansion)",
    unitHint: "µm/(m·K) or 1/K",
  },
  specificHeat: {
    label: "Specific heat",
    unitHint: "J/(kg·K)",
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
      status: "typical-range",
      display: "Typical range — grade-dependent (often below common metals)",
      note: "Filled grades (glass, mineral) raise density vs neat resin.",
    },
    elasticModulus: {
      status: "typical-range",
      display:
        "Typical range — grade-dependent (much lower than structural metals)",
      note: "Temperature, strain rate, and fiber fill shift modulus strongly.",
    },
    poissonRatio: {
      status: "grade-dependent",
      display: "Grade-dependent — confirm on datasheet for FEA",
      note: "Often near ~0.3–0.4 for many thermoplastics, but do not assume.",
    },
    yieldStrength: {
      status: "grade-dependent",
      display:
        "Grade-dependent — many plastics report yield or offset yield inconsistently",
      note: "Use supplier stress–strain data at your temperature and rate.",
    },
    ultimateStrength: {
      status: "typical-range",
      display: "Typical range — grade-dependent (verify tensile method)",
      note: "ASTM/ISO methods and conditioned vs dry specimens differ.",
    },
    thermalConductivity: {
      status: "educational",
      display:
        "Educational: generally low vs metals; filled grades vary widely",
    },
    cte: {
      status: "educational",
      display:
        "Educational: often high vs metals — watch thermal fit and warpage",
      note: "Anisotropic CTE is common in fiber-filled moldings.",
    },
    specificHeat: {
      status: "unverified",
      display: "Unverified here — take from grade datasheet / library",
    },
  },
  metal: {
    density: {
      status: "typical-range",
      display:
        "Typical range — alloy-dependent (Al low; steels/Cu higher; Ti mid)",
    },
    elasticModulus: {
      status: "typical-range",
      display:
        "Typical range — alloy family dependent (steels high; Al/Mg lower)",
      note: "Modulus is more stable than strength across heat treatments.",
    },
    poissonRatio: {
      status: "grade-dependent",
      display: "Grade-dependent — often near ~0.3 for many alloys; verify",
    },
    yieldStrength: {
      status: "grade-dependent",
      display:
        "Grade- & temper/condition-dependent — do not use family averages in FEA",
    },
    ultimateStrength: {
      status: "grade-dependent",
      display: "Grade- & condition-dependent — confirm temper / heat treat",
    },
    thermalConductivity: {
      status: "educational",
      display:
        "Educational: Cu/Al high; stainless lower; check alloy datasheet",
    },
    cte: {
      status: "educational",
      display: "Educational: alloy-dependent; important for multi-material fits",
    },
    specificHeat: {
      status: "unverified",
      display: "Unverified here — take from alloy datasheet / library",
    },
  },
  elastomer: {
    density: {
      status: "typical-range",
      display: "Typical range — compound-dependent (fillers shift density)",
    },
    elasticModulus: {
      status: "educational",
      display:
        "Educational: highly nonlinear / hyperelastic — small-strain E is limited",
      note: "Prelim FEA often needs hyperelastic models, not a single E.",
    },
    poissonRatio: {
      status: "educational",
      display:
        "Educational: nearly incompressible compounds are common — verify model",
      note: "Many analyses use ν ≈ 0.49 with care; confirm with compound data.",
    },
    yieldStrength: {
      status: "educational",
      display:
        "Educational: classical yield often not applicable like metals",
      note: "Use tensile stress at elongation, tear, and compression-set data.",
    },
    ultimateStrength: {
      status: "grade-dependent",
      display: "Compound-dependent tensile strength — verify test method",
    },
    thermalConductivity: {
      status: "educational",
      display: "Educational: generally low; thermally conductive grades exist",
    },
    cte: {
      status: "educational",
      display: "Educational: often high vs metals — seal/gasket thermal fit matters",
    },
    specificHeat: {
      status: "unverified",
      display: "Unverified here — take from compound datasheet",
    },
  },
  composite: {
    density: {
      status: "typical-range",
      display:
        "Typical range — fiber, resin, and volume fraction dependent",
    },
    elasticModulus: {
      status: "grade-dependent",
      display:
        "Direction-dependent (anisotropic) — laminate/schedule required for FEA",
      note: "Do not enter a single isotropic E without orientation context.",
    },
    poissonRatio: {
      status: "grade-dependent",
      display: "Anisotropic / laminate-dependent — from coupon or supplier data",
    },
    yieldStrength: {
      status: "educational",
      display:
        "Educational: failure modes differ (fiber, matrix, interface)",
      note: "Use allowables appropriate to the layup and load case.",
    },
    ultimateStrength: {
      status: "grade-dependent",
      display: "Layup- & process-dependent — verify fiber fraction and orientation",
    },
    thermalConductivity: {
      status: "educational",
      display: "Educational: often anisotropic; resin- vs fiber-dominated paths",
    },
    cte: {
      status: "educational",
      display: "Educational: strongly anisotropic with fiber direction",
    },
    specificHeat: {
      status: "unverified",
      display: "Unverified here — take from system datasheet / coupon tests",
    },
  },
  fabric: {
    density: {
      status: "educational",
      display:
        "Educational: areal density (g/m²) is more common than bulk density",
      note: "Bulk density depends on construction, loft, and lamination.",
    },
    elasticModulus: {
      status: "educational",
      display:
        "Educational: orthotropic / fabric models — not a single isotropic E",
      note: "Warp, weft, and bias behaviors differ; coatings change response.",
    },
    poissonRatio: {
      status: "unverified",
      display: "Unverified — fabric Poisson effects are construction-specific",
    },
    yieldStrength: {
      status: "educational",
      display:
        "Educational: tensile / tear ratings are construction-specific",
    },
    ultimateStrength: {
      status: "grade-dependent",
      display: "Construction-dependent — use fabric tensile & tear datasheets",
    },
    thermalConductivity: {
      status: "educational",
      display: "Educational: low for most textiles; loft and air gaps dominate",
    },
    cte: {
      status: "educational",
      display: "Educational: fiber + coating dependent; often secondary to humidity",
    },
    specificHeat: {
      status: "unverified",
      display: "Unverified here — rarely the first softgoods screening input",
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
        "Educational: aluminum alloys are much less stiff than steels — verify temper datasheet",
    },
    yieldStrength: {
      status: "grade-dependent",
      display: "Temper-dependent (e.g. T6 vs annealed) — do not assume T6 values",
    },
  },
  "al-7075": {
    yieldStrength: {
      status: "grade-dependent",
      display: "High-strength aluminum — temper- and product-form dependent",
    },
  },
  "ss-304": {
    thermalConductivity: {
      status: "educational",
      display: "Educational: stainless conducts less heat than carbon steel or Al",
    },
  },
  "ss-316": {
    thermalConductivity: {
      status: "educational",
      display: "Educational: similar stainless class — confirm alloy datasheet",
    },
  },
  "carbon-steel": {
    elasticModulus: {
      status: "educational",
      display:
        "Educational: carbon steels share a similar modulus family — strength still grade-dependent",
    },
  },
  "ti-6al4v": {
    density: {
      status: "educational",
      display: "Educational: titanium density sits between aluminum and steel",
    },
  },
  copper: {
    thermalConductivity: {
      status: "educational",
      display: "Educational: copper is among the highest thermal conductors in metals",
    },
  },
  peek: {
    elasticModulus: {
      status: "educational",
      display:
        "Educational: high-performance thermoplastic — filled grades raise stiffness sharply",
    },
  },
  nylon: {
    elasticModulus: {
      status: "grade-dependent",
      display:
        "Moisture-conditioned vs dry modulus can differ substantially — confirm state",
    },
  },
  silicone: {
    elasticModulus: {
      status: "educational",
      display:
        "Educational: soft hyperelastic response — single E is a weak FEA start",
    },
  },
  cfrp: {
    elasticModulus: {
      status: "grade-dependent",
      display:
        "Fiber direction dominates — enter laminate stack, not a single isotropic E",
    },
  },
  gfrp: {
    elasticModulus: {
      status: "grade-dependent",
      display: "Glass-fiber composites — orientation and Vf control stiffness",
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

export function simStatusLabel(status: SimPropertyStatus): string {
  switch (status) {
    case "unverified":
      return "Unverified";
    case "educational":
      return "Educational";
    case "typical-range":
      return "Typical range — grade-dependent";
    case "grade-dependent":
      return "Grade-dependent";
  }
}
