import type {
  MaterialId,
  PropertyCitation,
  SimPropertyKey,
  SourcedPropertyValue,
  SourcedValueConfidence,
} from "./types";

const VERIFIED = "2026-11-04";

type PropInput = {
  value: number;
  unit: string;
  method?: string;
  condition?: string;
  confidence?: SourcedValueConfidence;
  citationId: string;
};

export type SourcedGradeRecord = {
  /** Stable id for tabs / URLs, unique within a material. */
  id: string;
  /** Short folder-tab label (e.g. MG47). */
  tabLabel: string;
  materialId: MaterialId;
  gradeName: string;
  gradeNotes?: string;
  /** Default tab when opening the material page. */
  isDefault?: boolean;
  citations: PropertyCitation[];
  /** Only keys present on the cited sheet(s). Missing keys = not on datasheet. */
  values: Partial<Record<SimPropertyKey, PropInput>>;
  verifiedAt: string;
};

function cite(
  id: string,
  title: string,
  url: string,
  publisher: string
): PropertyCitation {
  return { id, title, url, publisher, verifiedAt: VERIFIED };
}

/**
 * Sourced commercial grades keyed by catalog materialId.
 * Multiple grades per material power folder tabs on the detail page.
 * Numbers only when present on the cited source — never invent values.
 */
export const SOURCED_GRADES: SourcedGradeRecord[] = [
  {
    id: "mg47",
    tabLabel: "MG47",
    materialId: "abs",
    gradeName: "SABIC CYCOLAC™ MG47",
    isDefault: true,
    gradeNotes:
      "Multi-purpose injection-molding ABS. ASTM D638 tensile modulus / yield used below.",
    citations: [
      cite(
        "cycolac-mg47",
        "CYCOLAC™ Resin MG47 technical datasheet (Americas)",
        "https://www.protolabs.com/media/lcwfkxga/cycolac-mg47.pdf",
        "SABIC (via Proto Labs mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.04,
        unit: "g/cm³",
        method: "ASTM D792 / ISO 1183",
        citationId: "cycolac-mg47",
      },
      elasticModulus: {
        value: 2.27,
        unit: "GPa",
        method: "ASTM D638, 5 mm/min",
        condition: "Tensile modulus",
        citationId: "cycolac-mg47",
      },
      yieldStrength: {
        value: 44,
        unit: "MPa",
        method: "ASTM D638 Type I, 5 mm/min",
        condition: "Tensile strength at yield",
        citationId: "cycolac-mg47",
      },
      ultimateStrength: {
        value: 33,
        unit: "MPa",
        method: "ASTM D638 Type I, 5 mm/min",
        condition: "Tensile strength at break",
        citationId: "cycolac-mg47",
      },
      cte: {
        value: 88.2,
        unit: "µm/(m·K)",
        method: "ASTM E831",
        condition: "−40 °C to 40 °C, flow (8.82×10⁻⁵ 1/°C)",
        citationId: "cycolac-mg47",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "mg38",
    tabLabel: "MG38",
    materialId: "abs",
    gradeName: "SABIC CYCOLAC™ MG38",
    gradeNotes:
      "Very high-impact ABS (lower MFR than MG47). Same ASTM tensile band as MG47 on the Americas sheet; compare impact/flow on the TDS.",
    citations: [
      cite(
        "cycolac-mg38",
        "CYCOLAC™ Resin MG38 technical datasheet (Americas)",
        "https://cn.hongrunplastics.com/public/uploads/images/20250617/SABIC%20ABS%20CYCOLAC%20Resin%20MG38.pdf",
        "SABIC (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.04,
        unit: "g/cm³",
        method: "ISO 1183",
        condition: "Specific gravity 1.05 (ASTM D792) on same sheet",
        citationId: "cycolac-mg38",
      },
      elasticModulus: {
        value: 2.27,
        unit: "GPa",
        method: "ASTM D638, 5 mm/min",
        condition: "Tensile modulus (2270 MPa)",
        citationId: "cycolac-mg38",
      },
      yieldStrength: {
        value: 44,
        unit: "MPa",
        method: "ASTM D638 Type I, 5 mm/min",
        condition: "Tensile stress at yield",
        citationId: "cycolac-mg38",
      },
      ultimateStrength: {
        value: 33,
        unit: "MPa",
        method: "ASTM D638 Type I, 5 mm/min",
        condition: "Tensile stress at break",
        citationId: "cycolac-mg38",
      },
      cte: {
        value: 88.2,
        unit: "µm/(m·K)",
        method: "ASTM E831",
        condition: "−40 °C to 40 °C, flow (8.82×10⁻⁵ 1/°C)",
        citationId: "cycolac-mg38",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "hmg47md",
    tabLabel: "HMG47MD",
    materialId: "abs",
    gradeName: "SABIC CYCOLAC™ HMG47MD",
    gradeNotes:
      "Medical-oriented ABS (ISO 10993 / FDA claims on TDS). ISO tensile modulus on this sheet is higher than the ASTM value — both listed; ASTM used for E consistency with MG47 tab.",
    citations: [
      cite(
        "cycolac-hmg47md",
        "CYCOLAC™ Resin HMG47MD technical datasheet (Americas)",
        "http://www.honcere.com/upfile/2020011917442066.pdf",
        "SABIC (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.05,
        unit: "g/cm³",
        method: "ISO 1183 / ASTM D792",
        citationId: "cycolac-hmg47md",
      },
      elasticModulus: {
        value: 2.27,
        unit: "GPa",
        method: "ASTM D638, 5 mm/min",
        condition: "Tensile modulus (ISO 527 lists 2.53 GPa on same sheet)",
        citationId: "cycolac-hmg47md",
      },
      yieldStrength: {
        value: 44,
        unit: "MPa",
        method: "ASTM D638 Type I, 5 mm/min",
        condition: "Tensile stress at yield (ISO 527 lists 50 MPa)",
        citationId: "cycolac-hmg47md",
      },
      ultimateStrength: {
        value: 33,
        unit: "MPa",
        method: "ASTM D638 Type I, 5 mm/min",
        condition: "Tensile stress at break",
        citationId: "cycolac-hmg47md",
      },
      cte: {
        value: 88.2,
        unit: "µm/(m·K)",
        method: "ISO 11359-2",
        condition: "−40 °C to 40 °C, flow (8.82×10⁻⁵ 1/°C)",
        citationId: "cycolac-hmg47md",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "lexan-141r",
    tabLabel: "141R",
    materialId: "pc",
    gradeName: "SABIC LEXAN™ 141R",
    isDefault: true,
    gradeNotes:
      "General-purpose polycarbonate (~10–12 MVR class). Europe/ISO sheet for tensile modulus; Cp from Americas Lexan 141 sheet.",
    citations: [
      cite(
        "lexan-141r-eu",
        "LEXAN™ Resin 141R technical datasheet (Europe)",
        "https://plastore.it/cgi2018/file818/233_pc%20lexan%20141r.pdf",
        "SABIC (distributor mirror)"
      ),
      cite(
        "lexan-141-americas",
        "Lexan* Resin 141 Americas datasheet (specific heat / alternate k)",
        "https://i.trade-cloud.com.cn/upload/7896/pdf/141.pdf",
        "SABIC (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.2,
        unit: "g/cm³",
        method: "ISO 1183",
        citationId: "lexan-141r-eu",
      },
      elasticModulus: {
        value: 2.35,
        unit: "GPa",
        method: "ISO 527, 1 mm/min",
        condition: "Tensile modulus",
        citationId: "lexan-141r-eu",
      },
      yieldStrength: {
        value: 63,
        unit: "MPa",
        method: "ISO 527, 50 mm/min",
        condition: "Tensile stress at yield",
        citationId: "lexan-141r-eu",
      },
      ultimateStrength: {
        value: 70,
        unit: "MPa",
        method: "ISO 527, 50 mm/min",
        condition: "Tensile stress at break",
        citationId: "lexan-141r-eu",
      },
      thermalConductivity: {
        value: 0.2,
        unit: "W/(m·K)",
        method: "ISO 8302",
        citationId: "lexan-141r-eu",
      },
      cte: {
        value: 70,
        unit: "µm/(m·K)",
        method: "ISO 11359-2",
        condition: "23 °C to 80 °C, flow (7.0×10⁻⁵ 1/°C)",
        citationId: "lexan-141r-eu",
      },
      specificHeat: {
        value: 1250,
        unit: "J/(kg·K)",
        method: "ASTM C351",
        condition: "1.25 J/g·°C on Americas Lexan 141 sheet",
        citationId: "lexan-141-americas",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "lexan-121r",
    tabLabel: "121R",
    materialId: "pc",
    gradeName: "SABIC LEXAN™ 121R",
    gradeNotes:
      "Higher-flow PC (MVR 21 at 300 °C/1.2 kg on Europe TDS) with mold release. Tensile modulus matches 141R on ISO sheet; break strength is lower.",
    citations: [
      cite(
        "lexan-121r-eu",
        "LEXAN™ Resin 121R technical datasheet (Europe)",
        "https://www.fist.si/storage/uploads/e8fed0da-b5c4-4e6a-a532-4cba34027e8e/LEXAN%E2%84%A2-Resin_121R_Europe_Technical_Data_Sheet-1.pdf",
        "SABIC (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.2,
        unit: "g/cm³",
        method: "ISO 1183",
        citationId: "lexan-121r-eu",
      },
      elasticModulus: {
        value: 2.35,
        unit: "GPa",
        method: "ISO 527, 1 mm/min",
        condition: "Tensile modulus",
        citationId: "lexan-121r-eu",
      },
      yieldStrength: {
        value: 63,
        unit: "MPa",
        method: "ISO 527, 50 mm/min",
        condition: "Tensile stress at yield",
        citationId: "lexan-121r-eu",
      },
      ultimateStrength: {
        value: 65,
        unit: "MPa",
        method: "ISO 527, 50 mm/min",
        condition: "Tensile stress at break",
        citationId: "lexan-121r-eu",
      },
      thermalConductivity: {
        value: 0.2,
        unit: "W/(m·K)",
        method: "ISO 8302",
        citationId: "lexan-121r-eu",
      },
      cte: {
        value: 70,
        unit: "µm/(m·K)",
        method: "ISO 11359-2",
        condition: "23 °C to 80 °C, xflow (7.0×10⁻⁵ 1/°C)",
        citationId: "lexan-121r-eu",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "c2950",
    tabLabel: "C2950",
    materialId: "pcabs",
    gradeName: "SABIC CYCOLOY™ C2950",
    isDefault: true,
    gradeNotes:
      "Flame-retardant PC/ABS. Americas sheet lists flexural modulus, not tensile modulus — E left blank.",
    citations: [
      cite(
        "cycoloy-c2950",
        "CYCOLOY™ FR Resin C2950 technical datasheet (Americas)",
        "https://www.protolabs.com/media/bradf1xa/cycoloy-c2950-3.pdf",
        "SABIC (via Proto Labs mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.18,
        unit: "g/cm³",
        method: "ASTM D792",
        condition: "Natural (color grades listed at 1.22)",
        citationId: "cycoloy-c2950",
      },
      yieldStrength: {
        value: 62,
        unit: "MPa",
        method: "ASTM D638 Type I, 50 mm/min",
        condition: "Tensile stress at yield",
        citationId: "cycoloy-c2950",
      },
      thermalConductivity: {
        value: 0.2,
        unit: "W/(m·K)",
        method: "ASTM C177",
        citationId: "cycoloy-c2950",
      },
      cte: {
        value: 72,
        unit: "µm/(m·K)",
        method: "ASTM D696",
        condition: "−30 °C to 30 °C, flow (7.2×10⁻⁵ 1/°C)",
        citationId: "cycoloy-c2950",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "hp500n",
    tabLabel: "HP500N",
    materialId: "pp",
    gradeName: "LyondellBasell Moplen HP500N",
    isDefault: true,
    gradeNotes:
      "PP homopolymer for general-purpose injection molding. ISO Europe typicals.",
    citations: [
      cite(
        "moplen-hp500n",
        "Moplen HP500N technical data sheet",
        "https://plasmar.com.tr/en/core/uploads/page/document/HP500N.pdf",
        "LyondellBasell (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 0.9,
        unit: "g/cm³",
        method: "ISO 1183-1",
        citationId: "moplen-hp500n",
      },
      elasticModulus: {
        value: 1.4,
        unit: "GPa",
        method: "ISO 527-1/-2",
        condition: "Tensile modulus (1400 MPa)",
        citationId: "moplen-hp500n",
      },
      yieldStrength: {
        value: 35,
        unit: "MPa",
        method: "ISO 527-1/-2",
        condition: "Tensile stress at yield",
        citationId: "moplen-hp500n",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "spectar-14471",
    tabLabel: "Spectar 14471",
    materialId: "petg",
    gradeName: "Eastman Spectar™ 14471 copolyester",
    isDefault: true,
    gradeNotes: "Clear PETG copolyester sheet/resin grade used for displays and formed parts.",
    citations: [
      cite(
        "spectar-14471",
        "Eastman Spectar™ copolyester 14471 product datasheet",
        "https://productcatalog.eastman.com/tds/ProdDatasheet.aspx?pn=eastman-spectar-14471-copolyester&product=71071187",
        "Eastman Chemical Company"
      ),
    ],
    values: {
      density: {
        value: 1.27,
        unit: "g/cm³",
        method: "ASTM D1505 / ISO 1183",
        citationId: "spectar-14471",
      },
      elasticModulus: {
        value: 2.2,
        unit: "GPa",
        method: "ISO 527 / ASTM D638",
        condition: "Tensile modulus (2200 MPa)",
        citationId: "spectar-14471",
      },
      yieldStrength: {
        value: 53,
        unit: "MPa",
        method: "ISO 527 / ASTM D638",
        condition: "Tensile strength at yield",
        citationId: "spectar-14471",
      },
      ultimateStrength: {
        value: 26,
        unit: "MPa",
        method: "ISO 527 / ASTM D638",
        condition: "Tensile strength at break",
        citationId: "spectar-14471",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "zytel-101l",
    tabLabel: "Zytel 101L",
    materialId: "nylon",
    gradeName: "DuPont Zytel® 101L NC010 (PA66)",
    isDefault: true,
    gradeNotes:
      "Unreinforced lubricated PA66. Dry-as-molded (DAM) mechanical values used; conditioned values differ substantially.",
    citations: [
      cite(
        "zytel-101l",
        "Zytel® 101L NC010 datasheet",
        "https://www.protolabs.com/media/tcebrq5j/zytel-101l.pdf",
        "DuPont Performance Polymers (via Proto Labs mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.14,
        unit: "g/cm³",
        method: "ISO 1183",
        condition: "Dry",
        citationId: "zytel-101l",
      },
      elasticModulus: {
        value: 3.1,
        unit: "GPa",
        method: "ISO 527-2",
        condition: "Dry as molded (3100 MPa); conditioned ≈ 1.4 GPa",
        citationId: "zytel-101l",
      },
      poissonRatio: {
        value: 0.37,
        unit: "—",
        method: "ISO 527",
        condition: "Dry (conditioned listed as 0.43 on same sheet)",
        citationId: "zytel-101l",
      },
      yieldStrength: {
        value: 82,
        unit: "MPa",
        method: "ISO 527-2",
        condition: "Dry as molded yield stress",
        citationId: "zytel-101l",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "delrin-100",
    tabLabel: "Delrin 100",
    materialId: "pom",
    gradeName: "DuPont Delrin® 100 NC010",
    isDefault: true,
    gradeNotes: "High-viscosity acetal homopolymer for injection molding.",
    citations: [
      cite(
        "delrin-100",
        "Delrin® 100 NC010 product information / MDS",
        "https://www.picoplast.nl/uploads/Delrin%20100%20NC010%20-%20MDS%20-%20EN.pdf",
        "DuPont (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.42,
        unit: "g/cm³",
        method: "ISO 1183",
        condition: "1420 kg/m³",
        citationId: "delrin-100",
      },
      elasticModulus: {
        value: 2.9,
        unit: "GPa",
        method: "ISO 527-1/-2",
        condition: "Tensile modulus (2900 MPa)",
        citationId: "delrin-100",
      },
      yieldStrength: {
        value: 71,
        unit: "MPa",
        method: "ISO 527-1/-2",
        condition: "Yield stress",
        citationId: "delrin-100",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "t6",
    tabLabel: "6061-T6",
    materialId: "al-6061",
    gradeName: "Aluminum 6061-T6 (Aluminum Association typical)",
    isDefault: true,
    gradeNotes:
      "Wrought 6061-T6 typicals attributed to Aluminum Association via ASM/MatWeb compilation. ASTM B209 minima are lower — confirm product form.",
    citations: [
      cite(
        "aa-6061-t6-matweb",
        "ASM/MatWeb Aluminum 6061-T6 material data sheet (AA typicals)",
        "https://asm.matweb.com/search/specificmaterial.asp?bassnum=ma6061t6",
        "ASM / MatWeb (citing Aluminum Association typicals)"
      ),
    ],
    values: {
      density: {
        value: 2.7,
        unit: "g/cm³",
        method: "AA typical",
        confidence: "association-typical",
        citationId: "aa-6061-t6-matweb",
      },
      elasticModulus: {
        value: 68.9,
        unit: "GPa",
        method: "AA typical",
        condition: "Average of tension and compression",
        confidence: "association-typical",
        citationId: "aa-6061-t6-matweb",
      },
      poissonRatio: {
        value: 0.33,
        unit: "—",
        condition: "Estimated from trends in similar Al alloys (per MatWeb note)",
        confidence: "association-typical",
        citationId: "aa-6061-t6-matweb",
      },
      yieldStrength: {
        value: 276,
        unit: "MPa",
        method: "AA typical",
        condition: "Tensile yield strength, T6",
        confidence: "association-typical",
        citationId: "aa-6061-t6-matweb",
      },
      ultimateStrength: {
        value: 310,
        unit: "MPa",
        method: "AA typical",
        condition: "Ultimate tensile strength, T6",
        confidence: "association-typical",
        citationId: "aa-6061-t6-matweb",
      },
      thermalConductivity: {
        value: 167,
        unit: "W/(m·K)",
        method: "AA typical",
        condition: "At 77 °F / 25 °C",
        confidence: "association-typical",
        citationId: "aa-6061-t6-matweb",
      },
      cte: {
        value: 23.6,
        unit: "µm/(m·K)",
        method: "AA typical",
        condition: "Average over 68–212 °F (20–100 °C)",
        confidence: "association-typical",
        citationId: "aa-6061-t6-matweb",
      },
      specificHeat: {
        value: 896,
        unit: "J/(kg·K)",
        method: "Listed on MatWeb sheet",
        condition: "0.896 J/g·°C",
        confidence: "association-typical",
        citationId: "aa-6061-t6-matweb",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "t4",
    tabLabel: "6061-T4",
    materialId: "al-6061",
    gradeName: "Aluminum 6061-T4 / T451 (Aluminum Association typical)",
    gradeNotes:
      "Solution heat-treated, naturally aged. Lower yield/UTS than T6; density and modulus match AA typicals for the alloy.",
    citations: [
      cite(
        "aa-6061-t4-matweb",
        "ASM/MatWeb Aluminum 6061-T4; 6061-T451 material data sheet (AA typicals)",
        "https://asm.matweb.com/search/specificmaterial.asp?bassnum=ma6061T4",
        "ASM / MatWeb (citing Aluminum Association typicals)"
      ),
    ],
    values: {
      density: {
        value: 2.7,
        unit: "g/cm³",
        method: "AA typical",
        confidence: "association-typical",
        citationId: "aa-6061-t4-matweb",
      },
      elasticModulus: {
        value: 68.9,
        unit: "GPa",
        method: "AA typical",
        condition: "Average of tension and compression",
        confidence: "association-typical",
        citationId: "aa-6061-t4-matweb",
      },
      poissonRatio: {
        value: 0.33,
        unit: "—",
        condition: "Estimated from trends in similar Al alloys (per MatWeb note)",
        confidence: "association-typical",
        citationId: "aa-6061-t4-matweb",
      },
      yieldStrength: {
        value: 145,
        unit: "MPa",
        method: "AA typical",
        condition: "Tensile yield strength, T4",
        confidence: "association-typical",
        citationId: "aa-6061-t4-matweb",
      },
      ultimateStrength: {
        value: 241,
        unit: "MPa",
        method: "AA typical",
        condition: "Ultimate tensile strength, T4",
        confidence: "association-typical",
        citationId: "aa-6061-t4-matweb",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "a240-annealed",
    tabLabel: "A240 annealed",
    materialId: "ss-304",
    gradeName: "ASTM A240 Type 304 annealed (UNS S30400)",
    isDefault: true,
    gradeNotes:
      "Yield/UTS are ASTM A240 minimums (annealed flat product), not typical mill values. Physical properties are published typicals for Type 304.",
    citations: [
      cite(
        "astm-a240-304",
        "ASTM A240/A240M Type 304 mechanical requirements (summary)",
        "https://304stainlesssteel.org/304-stainless-steel-properties/",
        "Industry summary of ASTM A240 Type 304"
      ),
      cite(
        "asm-atlas-304",
        "ASM Alloy Digest ATLAS 304 physical property table",
        "https://doi.org/10.31399/asm.ad.ss1362",
        "ASM International"
      ),
    ],
    values: {
      density: {
        value: 7.9,
        unit: "g/cm³",
        method: "ASM Alloy Digest typical",
        condition: "7900 kg/m³ at RT",
        confidence: "association-typical",
        citationId: "asm-atlas-304",
      },
      elasticModulus: {
        value: 193,
        unit: "GPa",
        method: "Published typical",
        confidence: "association-typical",
        citationId: "astm-a240-304",
      },
      yieldStrength: {
        value: 205,
        unit: "MPa",
        method: "ASTM A240/A240M",
        condition: "0.2% proof strength, minimum, annealed",
        confidence: "standard-minimum",
        citationId: "astm-a240-304",
      },
      ultimateStrength: {
        value: 515,
        unit: "MPa",
        method: "ASTM A240/A240M",
        condition: "Tensile strength, minimum, annealed",
        confidence: "standard-minimum",
        citationId: "astm-a240-304",
      },
      thermalConductivity: {
        value: 16.2,
        unit: "W/(m·K)",
        method: "Published typical",
        condition: "At 100 °C",
        confidence: "association-typical",
        citationId: "astm-a240-304",
      },
      cte: {
        value: 17.2,
        unit: "µm/(m·K)",
        method: "Published typical",
        condition: "0–100 °C",
        confidence: "association-typical",
        citationId: "astm-a240-304",
      },
      specificHeat: {
        value: 500,
        unit: "J/(kg·K)",
        method: "Published typical",
        condition: "At 20 °C",
        confidence: "association-typical",
        citationId: "astm-a240-304",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "n1206-70",
    tabLabel: "N1206-70",
    materialId: "nbr",
    gradeName: "Parker N1206-70 NBR (Buna-N), Shore A ~70",
    isDefault: true,
    gradeNotes:
      "O-ring compound test report. Elastomers are hyperelastic — sheet lists 100% modulus, not small-strain E; Poisson not listed.",
    citations: [
      cite(
        "parker-n1206-70",
        "Parker N1206-70 NBR Buna-N compound datasheet / test report",
        "https://www.marcorubber.com/downloads/Marco-Material-Datasheet-Parker-N1206-70.pdf",
        "Parker (via Marco Rubber mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.2,
        unit: "g/cm³",
        method: "ISO 1183 / ASTM D297",
        condition: "Finished part density",
        citationId: "parker-n1206-70",
      },
      ultimateStrength: {
        value: 13.6,
        unit: "MPa",
        method: "ISO 37 / ASTM D412 Die C",
        condition: "Tensile strength (test result on O-rings)",
        citationId: "parker-n1206-70",
      },
    },
    verifiedAt: VERIFIED,
  },
];

export function getSourcedGrades(materialId: MaterialId): SourcedGradeRecord[] {
  return SOURCED_GRADES.filter((g) => g.materialId === materialId);
}

export function getDefaultSourcedGrade(
  materialId: MaterialId
): SourcedGradeRecord | undefined {
  const grades = getSourcedGrades(materialId);
  return grades.find((g) => g.isDefault) ?? grades[0];
}

/** @deprecated Prefer getSourcedGrades / getDefaultSourcedGrade */
export function getSourcedGrade(
  materialId: MaterialId,
  gradeId?: string | null
): SourcedGradeRecord | undefined {
  if (gradeId === null) return undefined;
  if (gradeId) {
    return getSourcedGrades(materialId).find((g) => g.id === gradeId);
  }
  return getDefaultSourcedGrade(materialId);
}

export function resolveSourcedValue(
  grade: SourcedGradeRecord,
  key: SimPropertyKey
): SourcedPropertyValue | null {
  const raw = grade.values[key];
  if (!raw) return null;
  const citation = grade.citations.find((c) => c.id === raw.citationId);
  if (!citation) return null;
  return {
    value: raw.value,
    unit: raw.unit,
    grade: grade.gradeName,
    method: raw.method,
    condition: raw.condition,
    confidence: raw.confidence ?? "datasheet-typical",
    citation,
  };
}

export function sourcedConfidenceLabel(
  confidence: SourcedValueConfidence
): string {
  switch (confidence) {
    case "datasheet-typical":
      return "Datasheet typical";
    case "standard-minimum":
      return "Standard minimum";
    case "association-typical":
      return "Association typical";
  }
}

export function listSourcedMaterialIds(): MaterialId[] {
  return [...new Set(SOURCED_GRADES.map((g) => g.materialId))];
}
