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

  // —— HIPS (multi-grade) ——
  {
    id: "styron-404",
    tabLabel: "STYRON 404",
    materialId: "hips",
    gradeName: "Americas Styrenics STYRON™ 404",
    isDefault: true,
    gradeNotes:
      "Additive-free HIPS for compounding/masterbatch and general molding. ASTM Americas sheet.",
    citations: [
      cite(
        "styron-404",
        "STYRON™ 404 North America technical datasheet",
        "https://amsty.com/images/2026-TDS/HIPS/styron404-tech-en-2026.pdf",
        "Americas Styrenics"
      ),
    ],
    values: {
      density: {
        value: 1.04,
        unit: "g/cm³",
        method: "ASTM D792",
        citationId: "styron-404",
      },
      elasticModulus: {
        value: 1.9,
        unit: "GPa",
        method: "ASTM D638",
        condition: "Tensile modulus (1900 MPa)",
        citationId: "styron-404",
      },
      yieldStrength: {
        value: 33,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile strength",
        citationId: "styron-404",
      },
      ultimateStrength: {
        value: 33,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile rupture",
        citationId: "styron-404",
      },
      cte: {
        value: 90,
        unit: "µm/(m·K)",
        method: "ASTM D696",
        condition: "9×10⁻⁵ cm/(cm·°C)",
        citationId: "styron-404",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "styron-487",
    tabLabel: "STYRON 487",
    materialId: "hips",
    gradeName: "Americas Styrenics STYRON™ 487",
    gradeNotes:
      "Tougher HIPS (higher Izod) with slightly lower tensile strength than STYRON 404 on the same Americas TDS format.",
    citations: [
      cite(
        "styron-487",
        "STYRON™ 487 North America technical datasheet",
        "https://amsty.com/images/2026-TDS/HIPS/styron487-tech-en-2026.pdf",
        "Americas Styrenics"
      ),
    ],
    values: {
      density: {
        value: 1.04,
        unit: "g/cm³",
        method: "ASTM D792",
        citationId: "styron-487",
      },
      elasticModulus: {
        value: 2.0,
        unit: "GPa",
        method: "ASTM D638",
        condition: "Tensile modulus (2000 MPa)",
        citationId: "styron-487",
      },
      yieldStrength: {
        value: 31,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile strength",
        citationId: "styron-487",
      },
      ultimateStrength: {
        value: 28,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile rupture",
        citationId: "styron-487",
      },
      cte: {
        value: 90,
        unit: "µm/(m·K)",
        method: "ASTM D696",
        condition: "9×10⁻⁵ cm/(cm·°C)",
        citationId: "styron-487",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "ps-495f",
    tabLabel: "PS 495F",
    materialId: "hips",
    gradeName: "INEOS Styrolution PS 495F",
    gradeNotes:
      "High-flow HIPS (MVR 9.5 at 200 °C/5 kg). Europe/ISO sheet; includes thermal conductivity.",
    citations: [
      cite(
        "styrolution-ps-495f",
        "Styrolution PS 495F technical datasheet",
        "https://easternever.com/wp-content/uploads/2021/11/StyrolutionTDS-PS-495F.pdf",
        "INEOS Styrolution (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.05,
        unit: "g/cm³",
        method: "ISO 1183",
        condition: "1050 kg/m³",
        citationId: "styrolution-ps-495f",
      },
      elasticModulus: {
        value: 2.0,
        unit: "GPa",
        method: "ISO 527",
        condition: "Tensile modulus (2000 MPa)",
        citationId: "styrolution-ps-495f",
      },
      yieldStrength: {
        value: 26,
        unit: "MPa",
        method: "ISO 527",
        condition: "Tensile stress at yield, 23 °C",
        citationId: "styrolution-ps-495f",
      },
      thermalConductivity: {
        value: 0.17,
        unit: "W/(m·K)",
        method: "DIN 52612-1",
        citationId: "styrolution-ps-495f",
      },
      cte: {
        value: 100,
        unit: "µm/(m·K)",
        method: "ISO 11359",
        condition: "100×10⁻⁶ /°C",
        citationId: "styrolution-ps-495f",
      },
    },
    verifiedAt: VERIFIED,
  },

  // —— HDPE ——
  {
    id: "m80064",
    tabLabel: "M80064",
    materialId: "hdpe",
    gradeName: "SABIC® HDPE M80064",
    isDefault: true,
    gradeNotes:
      "Injection-molding HDPE (narrow MWD) for crates, pails, and rigid molded goods. Uses 1% secant modulus as listed E.",
    citations: [
      cite(
        "sabic-hdpe-m80064",
        "SABIC® HDPE M80064 technical datasheet",
        "https://www.chemategroup.com/wp-content/uploads/2023/05/SABIC%C2%AE-HDPE-M80064-TDS.pdf",
        "SABIC (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 0.964,
        unit: "g/cm³",
        method: "ASTM D1505",
        condition: "964 kg/m³ at 23 °C",
        citationId: "sabic-hdpe-m80064",
      },
      elasticModulus: {
        value: 0.95,
        unit: "GPa",
        method: "ASTM D638",
        condition: "1% secant modulus (950 MPa)",
        citationId: "sabic-hdpe-m80064",
      },
      yieldStrength: {
        value: 26,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile strength at yield",
        citationId: "sabic-hdpe-m80064",
      },
      ultimateStrength: {
        value: 18,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile strength at break",
        citationId: "sabic-hdpe-m80064",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "he9621",
    tabLabel: "HE9621-PH",
    materialId: "hdpe",
    gradeName: "Borealis Bormed™ HE9621-PH-1",
    gradeNotes:
      "Healthcare-oriented injection HDPE with ISO tensile modulus. Evaluate regulatory claims separately for medical use.",
    citations: [
      cite(
        "bormed-he9621",
        "Bormed™ HE9621-PH-1 product data sheet",
        "https://www.borealisgroup.com/storage/Datasheets/HE9621-PH-1-PDS-REG_WORLD-EN-V4-PDS-WORLD-61901-PDS_BORMED%20HE9621-PH-1_4_03092024.pdf",
        "Borealis"
      ),
    ],
    values: {
      density: {
        value: 0.963,
        unit: "g/cm³",
        method: "ISO 1183-1 Method A",
        condition: "963 kg/m³",
        citationId: "bormed-he9621",
      },
      elasticModulus: {
        value: 1.2,
        unit: "GPa",
        method: "ISO 527-2, 1 mm/min",
        condition: "Tensile modulus (1200 MPa)",
        citationId: "bormed-he9621",
      },
      yieldStrength: {
        value: 26,
        unit: "MPa",
        method: "ISO 527-2, 50 mm/min",
        condition: "Tensile stress at yield",
        citationId: "bormed-he9621",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "crp100",
    tabLabel: "CRP 100",
    materialId: "hdpe",
    gradeName: "LyondellBasell Hostalen CRP 100 black (PE 100)",
    gradeNotes:
      "Pipe-grade PE 100 compound. PDF lists density and tensile modulus; yield taken from the matching LYB product page typicals.",
    citations: [
      cite(
        "hostalen-crp100-pdf",
        "Hostalen CRP 100 black product information PDF",
        "https://www.lyondellbasell.com/globalassets/lyb/our-solutions/products/documents/polymers-technical-literature/product-information---hostalen-crp-100-black.pdf",
        "LyondellBasell"
      ),
      cite(
        "hostalen-crp100-page",
        "Hostalen CRP 100 BLACK product page typicals",
        "https://www.lyondellbasell.com/en/polymers/p/Hostalen-CRP-100-BLACK/30908850-0d1b-4d36-85f8-450580198b6b",
        "LyondellBasell"
      ),
    ],
    values: {
      density: {
        value: 0.959,
        unit: "g/cm³",
        method: "ISO 1183-1",
        citationId: "hostalen-crp100-pdf",
      },
      elasticModulus: {
        value: 1.1,
        unit: "GPa",
        method: "ISO 527-1/-2",
        condition: "Tensile modulus at 23 °C (1100 MPa)",
        citationId: "hostalen-crp100-pdf",
      },
      yieldStrength: {
        value: 23,
        unit: "MPa",
        method: "ISO 527",
        condition: "Tensile stress at yield, 23 °C, 50 mm/min",
        citationId: "hostalen-crp100-page",
      },
    },
    verifiedAt: VERIFIED,
  },

  // —— LDPE ——
  {
    id: "ld2102x0",
    tabLabel: "2102X0",
    materialId: "ldpe",
    gradeName: "SABIC® LDPE 2102X0",
    isDefault: true,
    gradeNotes:
      "Foam-oriented LDPE with ISO 527-2 molded tensile properties on the TDS.",
    citations: [
      cite(
        "sabic-ldpe-2102x0",
        "SABIC® LDPE 2102X0 technical datasheet",
        "https://www.lyragroup.biz/pdf/2102X0.pdf",
        "SABIC (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 0.921,
        unit: "g/cm³",
        method: "ASTM D1505",
        condition: "921 kg/m³",
        citationId: "sabic-ldpe-2102x0",
      },
      elasticModulus: {
        value: 0.175,
        unit: "GPa",
        method: "ISO 527-2",
        condition: "Tensile modulus (175 MPa)",
        citationId: "sabic-ldpe-2102x0",
      },
      yieldStrength: {
        value: 9,
        unit: "MPa",
        method: "ISO 527-2",
        condition: "Stress at yield",
        citationId: "sabic-ldpe-2102x0",
      },
      ultimateStrength: {
        value: 13,
        unit: "MPa",
        method: "ISO 527-2",
        condition: "Stress at break",
        citationId: "sabic-ldpe-2102x0",
      },
    },
    verifiedAt: VERIFIED,
  },

  // —— PMMA ——
  {
    id: "plexiglas-8n",
    tabLabel: "8N",
    materialId: "pmma",
    gradeName: "PLEXIGLAS® 8N",
    isDefault: true,
    gradeNotes: "Standard injection/extrusion PMMA molding compound (Röhm).",
    citations: [
      cite(
        "plexiglas-8n",
        "PLEXIGLAS® 8N material data sheet",
        "https://www.picoplast.nl/uploads/Plexiglas%208N%20-%20MDS%20-%20EN.pdf",
        "Röhm (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.19,
        unit: "g/cm³",
        method: "ISO 1183",
        citationId: "plexiglas-8n",
      },
      elasticModulus: {
        value: 3.3,
        unit: "GPa",
        method: "ISO 527, 1 mm/min",
        condition: "Tensile modulus (3300 MPa)",
        citationId: "plexiglas-8n",
      },
      ultimateStrength: {
        value: 77,
        unit: "MPa",
        method: "ISO 527, 5 mm/min",
        condition: "Stress at break",
        citationId: "plexiglas-8n",
      },
      cte: {
        value: 80,
        unit: "µm/(m·K)",
        method: "ISO 11359",
        condition: "0–50 °C (8×10⁻⁵ 1/K)",
        citationId: "plexiglas-8n",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "v825t",
    tabLabel: "V825T",
    materialId: "pmma",
    gradeName: "Altuglas® V825T",
    gradeNotes:
      "High-flow injection PMMA. This UL/distributor sheet lists tensile yield and flexural modulus; tensile E left blank (not listed as ISO 527 tensile modulus on the cited sheet).",
    citations: [
      cite(
        "altuglas-v825t",
        "Altuglas® V825T datasheet",
        "https://www.ledil.com/wp-content/uploads/2021/08/Datasheet-Altuglas%C2%AE-V825T.pdf",
        "Altuglas / Arkema (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.19,
        unit: "g/cm³",
        method: "ISO 1183",
        citationId: "altuglas-v825t",
      },
      yieldStrength: {
        value: 70,
        unit: "MPa",
        method: "ISO 527-2",
        condition: "Tensile stress at yield, 23 °C",
        citationId: "altuglas-v825t",
      },
      cte: {
        value: 65,
        unit: "µm/(m·K)",
        method: "ASTM D696",
        condition: "CLTE flow, −30 to 23 °C (6.5×10⁻⁵ cm/cm/°C)",
        citationId: "altuglas-v825t",
      },
      specificHeat: {
        value: 2090,
        unit: "J/(kg·K)",
        condition: "Listed specific heat on sheet",
        citationId: "altuglas-v825t",
      },
    },
    verifiedAt: VERIFIED,
  },

  // —— ASA ——
  {
    id: "luran-777k",
    tabLabel: "777K",
    materialId: "asa",
    gradeName: "INEOS Styrolution Luran® S 777K",
    isDefault: true,
    gradeNotes: "Standard high-flow injection ASA with balanced toughness and heat resistance.",
    citations: [
      cite(
        "luran-s-777k",
        "Luran® S 777K technical datasheet",
        "https://www.protolabs.com/media/43bexs4t/luran-s-777k.pdf",
        "INEOS Styrolution (via Proto Labs mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.07,
        unit: "g/cm³",
        method: "ISO 1183",
        citationId: "luran-s-777k",
      },
      elasticModulus: {
        value: 2.3,
        unit: "GPa",
        method: "ISO 527-1",
        condition: "Tensile modulus (2300 MPa)",
        citationId: "luran-s-777k",
      },
      yieldStrength: {
        value: 48,
        unit: "MPa",
        method: "ISO 527-2",
        condition: "Tensile stress at yield, 23 °C",
        citationId: "luran-s-777k",
      },
      thermalConductivity: {
        value: 0.17,
        unit: "W/(m·K)",
        method: "DIN 52612",
        citationId: "luran-s-777k",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "luran-778t",
    tabLabel: "778T",
    materialId: "asa",
    gradeName: "INEOS Styrolution Luran® S 778T",
    gradeNotes:
      "Higher-heat ASA grade. Values from Styrolution data compiled on LookPolymers PDF mirror — re-check live INEOS TDS before FEA.",
    citations: [
      cite(
        "luran-s-778t",
        "Styrolution Luran® S 778 T ASA datasheet (LookPolymers mirror)",
        "https://www.lookpolymers.com/pdf/Styrolution-Luran-S-778-T-ASA.pdf",
        "INEOS Styrolution (via LookPolymers mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.07,
        unit: "g/cm³",
        method: "ISO 1183",
        citationId: "luran-s-778t",
      },
      elasticModulus: {
        value: 2.36,
        unit: "GPa",
        method: "ASTM tensile modulus on sheet",
        condition: "2.36 GPa (ISO catalog often lists ~2500 MPa — confirm regional sheet)",
        citationId: "luran-s-778t",
      },
      yieldStrength: {
        value: 54,
        unit: "MPa",
        method: "ISO 527, 50 mm/min",
        condition: "Tensile strength at yield",
        citationId: "luran-s-778t",
      },
      cte: {
        value: 95,
        unit: "µm/(m·K)",
        method: "ISO 11359",
        condition: "Parallel to flow",
        citationId: "luran-s-778t",
      },
    },
    verifiedAt: VERIFIED,
  },

  // —— PLA ——
  {
    id: "ingeo-4043d",
    tabLabel: "4043D",
    materialId: "pla",
    gradeName: "NatureWorks Ingeo™ 4043D",
    isDefault: true,
    gradeNotes:
      "Film/filament extrusion PLA. Molded ASTM D638 values below are from the compiled grade sheet (separate from biax film D882 rows).",
    citations: [
      cite(
        "ingeo-4043d",
        "Ingeo™ 4043D datasheet (molded + film properties)",
        "https://4595257.fs1.hubspotusercontent-na1.net/hubfs/4595257/Support%20Platform/downloadable%20PDF/pla/Ingeo-4043D.pdf",
        "NatureWorks (distributor compilation mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.24,
        unit: "g/cm³",
        method: "ASTM D1505",
        citationId: "ingeo-4043d",
      },
      elasticModulus: {
        value: 3.6,
        unit: "GPa",
        method: "ASTM D638",
        condition: "Tensile modulus (3600 MPa), molded",
        citationId: "ingeo-4043d",
      },
      yieldStrength: {
        value: 60,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile strength at yield, molded",
        citationId: "ingeo-4043d",
      },
      ultimateStrength: {
        value: 53,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile strength at break, molded",
        citationId: "ingeo-4043d",
      },
    },
    verifiedAt: VERIFIED,
  },

  // —— PET ——
  {
    id: "polyclear-3302",
    tabLabel: "Crystal 3302",
    materialId: "pet",
    gradeName: "Indorama / Auriga Polyclear® Crystal Type 3302",
    isDefault: true,
    gradeNotes: "Bottle/engineering PET resin with ASTM D638 tensile typicals on the engineering properties sheet.",
    citations: [
      cite(
        "polyclear-3302",
        "Type 3302 engineering properties data sheet",
        "https://beta.indoramaventures.com/storage/downloads/specialty-polymers/new-data-sheets/3302-engineering-properties-data-sheet-rev1.pdf",
        "Indorama / Auriga Polymers"
      ),
    ],
    values: {
      density: {
        value: 1.39,
        unit: "g/cm³",
        method: "ASTM D792",
        citationId: "polyclear-3302",
      },
      elasticModulus: {
        value: 1.671,
        unit: "GPa",
        method: "ASTM D638",
        condition: "Tensile modulus (1671 MPa)",
        citationId: "polyclear-3302",
      },
      yieldStrength: {
        value: 49.4,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile stress at yield",
        citationId: "polyclear-3302",
      },
      ultimateStrength: {
        value: 24.6,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile stress at break",
        citationId: "polyclear-3302",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "eastar-en001",
    tabLabel: "Eastar EN001",
    materialId: "pet",
    gradeName: "Eastman Eastar™ EN001 copolyester",
    gradeNotes:
      "Clear copolyester often used near PET packaging/thermoforming duties — not bottle PET homopolymer. Listed under PET catalog family for grade comparison.",
    citations: [
      cite(
        "eastar-en001",
        "Eastman Eastar™ EN001 copolyester product datasheet",
        "https://productcatalog.eastman.com/tds/ProdDatasheet.aspx?pn=eastar-en001-copolyester&product=71107275",
        "Eastman Chemical Company"
      ),
    ],
    values: {
      density: {
        value: 1.33,
        unit: "g/cm³",
        method: "ASTM D792 / ISO 1183",
        citationId: "eastar-en001",
      },
      elasticModulus: {
        value: 2.4,
        unit: "GPa",
        method: "ASTM D638",
        condition: "Tensile modulus (2400 MPa)",
        citationId: "eastar-en001",
      },
      yieldStrength: {
        value: 58,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile stress at yield",
        citationId: "eastar-en001",
      },
      ultimateStrength: {
        value: 25,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile stress at break",
        citationId: "eastar-en001",
      },
    },
    verifiedAt: VERIFIED,
  },

  // —— PBT ——
  {
    id: "valox-325",
    tabLabel: "Valox 325",
    materialId: "pbt",
    gradeName: "SABIC VALOX™ Resin 325",
    isDefault: true,
    gradeNotes: "Unreinforced general-purpose PBT. Europe TDS used for ISO tensile modulus and CTE.",
    citations: [
      cite(
        "valox-325-eu",
        "VALOX™ Resin 325 Europe technical data sheet",
        "https://www.fist.si/storage/uploads/e0ffa70c-2f57-4cb9-b368-7806f556aed0/VALOX%E2%84%A2-Resin_325_Europe_Technical_Data_Sheet.pdf",
        "SABIC (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.31,
        unit: "g/cm³",
        method: "ISO 1183 / ASTM D792",
        citationId: "valox-325-eu",
      },
      elasticModulus: {
        value: 2.4,
        unit: "GPa",
        method: "ISO 527, 1 mm/min",
        condition: "Tensile modulus (2400 MPa); ASTM D638 also lists 2400 MPa",
        citationId: "valox-325-eu",
      },
      yieldStrength: {
        value: 55,
        unit: "MPa",
        method: "ISO 527, 50 mm/min",
        condition: "Tensile stress at yield (ASTM D638 lists 51 MPa)",
        citationId: "valox-325-eu",
      },
      ultimateStrength: {
        value: 55,
        unit: "MPa",
        method: "ISO 527, 50 mm/min",
        condition: "Tensile stress at break (ASTM D638 lists 35 MPa)",
        citationId: "valox-325-eu",
      },
      thermalConductivity: {
        value: 0.16,
        unit: "W/(m·K)",
        method: "ISO 8302",
        citationId: "valox-325-eu",
      },
      cte: {
        value: 130,
        unit: "µm/(m·K)",
        method: "ISO 11359-2",
        condition: "23 °C to 80 °C, flow (1.3×10⁻⁴ 1/°C)",
        citationId: "valox-325-eu",
      },
    },
    verifiedAt: VERIFIED,
  },

  // —— PVC ——
  {
    id: "geon-8700a",
    tabLabel: "8700A",
    materialId: "pvc",
    gradeName: "GEON® Vinyl Rigid Extrusion 8700A",
    isDefault: true,
    gradeNotes:
      "Rigid PVC extrusion compound (finished compound — not raw S-PVC resin powder).",
    citations: [
      cite(
        "geon-8700a",
        "Geon™ Vinyl Rigid Extrusion 8700A technical data sheet",
        "https://hongrunplastics.com/public/uploads/images/20250714/Geon%20Vinyl%20Rigid%20Extrusion%208700A.pdf",
        "GEON / PolyOne (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.38,
        unit: "g/cm³",
        method: "ASTM D792",
        citationId: "geon-8700a",
      },
      elasticModulus: {
        value: 2.69,
        unit: "GPa",
        method: "ASTM D638",
        condition: "Tensile modulus (2690 MPa)",
        citationId: "geon-8700a",
      },
      yieldStrength: {
        value: 42.7,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile strength at yield",
        citationId: "geon-8700a",
      },
      cte: {
        value: 67,
        unit: "µm/(m·K)",
        method: "ASTM D696",
        condition: "CLTE flow (6.7×10⁻⁵ cm/cm/°C)",
        citationId: "geon-8700a",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "geon-m3800",
    tabLabel: "M3800",
    materialId: "pvc",
    gradeName: "GEON® Vinyl Rigid Molding M3800",
    gradeNotes: "High-flow rigid PVC injection-molding compound.",
    citations: [
      cite(
        "geon-m3800",
        "Geon™ Vinyl Rigid Molding M3800 technical data sheet",
        "https://www.phmolds.com/wp-content/uploads/2016/09/PVC-Geon-M3800-White.pdf",
        "GEON / PolyOne (distributor mirror)"
      ),
    ],
    values: {
      density: {
        value: 1.33,
        unit: "g/cm³",
        method: "ASTM D792",
        citationId: "geon-m3800",
      },
      elasticModulus: {
        value: 2.28,
        unit: "GPa",
        method: "ASTM D638",
        condition: "Tensile modulus (2280 MPa)",
        citationId: "geon-m3800",
      },
      yieldStrength: {
        value: 41.4,
        unit: "MPa",
        method: "ASTM D638",
        condition: "Tensile strength at yield",
        citationId: "geon-m3800",
      },
    },
    verifiedAt: VERIFIED,
  },

  // —— Metals ——
  {
    id: "t6",
    tabLabel: "7075-T6",
    materialId: "al-7075",
    gradeName: "Aluminum 7075-T6 / T651 (Aluminum Association typical)",
    isDefault: true,
    gradeNotes:
      "High-strength 7xxx wrought aluminum. AA typicals via ASM/MatWeb — not for design; confirm product form and temper.",
    citations: [
      cite(
        "aa-7075-t6-matweb",
        "ASM/MatWeb Aluminum 7075-T6; 7075-T651 material data sheet (AA typicals)",
        "https://asm.matweb.com/search/SpecificMaterial.asp?bassnum=MA7075T6",
        "ASM / MatWeb (citing Aluminum Association typicals)"
      ),
    ],
    values: {
      density: {
        value: 2.81,
        unit: "g/cm³",
        method: "AA typical",
        confidence: "association-typical",
        citationId: "aa-7075-t6-matweb",
      },
      elasticModulus: {
        value: 71.7,
        unit: "GPa",
        method: "AA typical",
        condition: "Average of tension and compression",
        confidence: "association-typical",
        citationId: "aa-7075-t6-matweb",
      },
      poissonRatio: {
        value: 0.33,
        unit: "—",
        confidence: "association-typical",
        citationId: "aa-7075-t6-matweb",
      },
      yieldStrength: {
        value: 503,
        unit: "MPa",
        method: "AA typical",
        condition: "Tensile yield strength, T6",
        confidence: "association-typical",
        citationId: "aa-7075-t6-matweb",
      },
      ultimateStrength: {
        value: 572,
        unit: "MPa",
        method: "AA typical",
        condition: "Ultimate tensile strength, T6",
        confidence: "association-typical",
        citationId: "aa-7075-t6-matweb",
      },
      thermalConductivity: {
        value: 130,
        unit: "W/(m·K)",
        method: "AA typical",
        condition: "At 77 °F / 25 °C",
        confidence: "association-typical",
        citationId: "aa-7075-t6-matweb",
      },
      cte: {
        value: 23.6,
        unit: "µm/(m·K)",
        method: "AA typical",
        condition: "Average over 68–212 °F (20–100 °C)",
        confidence: "association-typical",
        citationId: "aa-7075-t6-matweb",
      },
      specificHeat: {
        value: 960,
        unit: "J/(kg·K)",
        method: "Listed on MatWeb sheet",
        condition: "0.96 J/g·°C",
        confidence: "association-typical",
        citationId: "aa-7075-t6-matweb",
      },
    },
    verifiedAt: VERIFIED,
  },
  {
    id: "a240-annealed",
    tabLabel: "A240 annealed",
    materialId: "ss-316",
    gradeName: "ASTM A240 Type 316 annealed (UNS S31600)",
    isDefault: true,
    gradeNotes:
      "Yield/UTS are ASTM A240 annealed minimums. Physical properties from published Type 316 typicals (Sandmeyer / industry summaries).",
    citations: [
      cite(
        "astm-a240-316",
        "ASTM A240 Type 316 mechanical requirements (summary)",
        "https://www.testcert.co/materials/ss-316",
        "Industry summary of ASTM A240 Type 316"
      ),
      cite(
        "sandmeyer-316",
        "Sandmeyer Steel Alloy 316/316L specification sheet",
        "https://www.sandmeyersteel.com/wp-content/uploads/316-316l-317l-spec-sheet.pdf",
        "Sandmeyer Steel Company"
      ),
    ],
    values: {
      density: {
        value: 7.9,
        unit: "g/cm³",
        method: "Published typical",
        condition: "0.285 lb/in³ on Sandmeyer sheet",
        confidence: "association-typical",
        citationId: "sandmeyer-316",
      },
      elasticModulus: {
        value: 200,
        unit: "GPa",
        method: "Published typical",
        condition: "29.0×10⁶ psi on Sandmeyer 316/316L sheet",
        confidence: "association-typical",
        citationId: "sandmeyer-316",
      },
      yieldStrength: {
        value: 205,
        unit: "MPa",
        method: "ASTM A240/A240M",
        condition: "0.2% proof strength, minimum, annealed",
        confidence: "standard-minimum",
        citationId: "astm-a240-316",
      },
      ultimateStrength: {
        value: 515,
        unit: "MPa",
        method: "ASTM A240/A240M",
        condition: "Tensile strength, minimum, annealed",
        confidence: "standard-minimum",
        citationId: "astm-a240-316",
      },
      thermalConductivity: {
        value: 14.6,
        unit: "W/(m·K)",
        method: "Published typical",
        condition: "At 100 °C / 212 °F on Sandmeyer sheet",
        confidence: "association-typical",
        citationId: "sandmeyer-316",
      },
      cte: {
        value: 16.6,
        unit: "µm/(m·K)",
        method: "Published typical",
        condition: "Mean CTE 20–100 °C (68–212 °F)",
        confidence: "association-typical",
        citationId: "sandmeyer-316",
      },
      specificHeat: {
        value: 450,
        unit: "J/(kg·K)",
        method: "Published typical",
        condition: "0–100 °C on Sandmeyer sheet",
        confidence: "association-typical",
        citationId: "sandmeyer-316",
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
