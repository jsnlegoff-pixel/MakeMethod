import type { Material } from "./types";

export const materials: Material[] = [
  {
    id: "hips",
    name: "HIPS",
    full: "High Impact Polystyrene",
    desc: "Affordable, formable thermoplastic for lightweight indoor covers, packaging, and display components.",
    pros: [
      "Low relative material cost",
      "Readily thermoformed from sheet",
      "Good cosmetic finishes",
    ],
    cons: [
      "Limited heat resistance",
      "Lower toughness than many ABS grades",
      "Poor unmodified UV durability",
    ],
    processes: ["thermo", "injection"],
  },
  {
    id: "abs",
    name: "ABS",
    full: "Acrylonitrile Butadiene Styrene",
    desc: "General-purpose engineering thermoplastic for durable consumer housings and molded components.",
    pros: ["Good impact toughness", "Attractive finishes", "Widely available"],
    cons: [
      "Standard grades have limited UV durability",
      "Higher material cost than HIPS in many cases",
      "Property variation by grade",
    ],
    processes: ["thermo", "injection", "fdm", "cnc"],
  },
  {
    id: "pp",
    name: "PP",
    full: "Polypropylene",
    desc: "Lightweight, chemical-resistant thermoplastic used in packaging, containers, and molded parts.",
    pros: [
      "Low density",
      "Good chemical resistance",
      "Potentially low material cost",
    ],
    cons: [
      "Difficult to bond or paint",
      "Shrinkage/warpage require attention",
      "Lower stiffness than some alternatives",
    ],
    processes: ["injection", "cnc"],
  },
  {
    id: "petg",
    name: "PETG",
    full: "Polyethylene Terephthalate Glycol-modified",
    desc: "Tough, easy-to-process thermoplastic used in printing, sheet forming, and clear covers.",
    pros: [
      "Useful toughness",
      "FDM-friendly grades",
      "Sheet grades can be thermoformed",
    ],
    cons: [
      "Surface can scratch",
      "Heat performance is grade-dependent",
      "FDM layer lines may require finishing",
    ],
    processes: ["fdm", "thermo"],
  },
  {
    id: "pla",
    name: "PLA",
    full: "Polylactic Acid",
    desc: "Common FDM filament for prototypes and light-duty products.",
    pros: [
      "Easy to print",
      "Wide color availability",
      "No dedicated mold required",
    ],
    cons: [
      "Low heat resistance in many grades",
      "Layer-dependent strength",
      "Post-processing for smooth surfaces",
    ],
    processes: ["fdm"],
  },
  {
    id: "pcabs",
    name: "PC/ABS",
    full: "Polycarbonate / ABS Blend",
    desc: "Engineering blend used in consumer and electronics housings requiring a balance of toughness and appearance.",
    pros: [
      "Good toughness",
      "Useful cosmetic potential",
      "Grade-specific flame-retardant options",
    ],
    cons: [
      "Higher resin cost",
      "Processing and shrinkage depend on grade",
      "May be unnecessary for light-duty shells",
    ],
    processes: ["injection", "cnc"],
  },
];

export function getMaterial(id: string) {
  return materials.find((m) => m.id === id);
}
