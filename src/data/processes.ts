import type { Process } from "./types";

export const processes: Process[] = [
  {
    id: "thermo",
    name: "Thermoforming",
    family: "Sheet forming",
    desc: "Heat plastic sheet, form it over or into a tool, cool, then trim.",
    best: "Open-backed shells, trays and covers",
    pros: [
      "Relatively accessible tooling for simple shapes",
      "Good sheet-side appearance",
      "Scales well for shallow shells",
    ],
    cons: [
      "Limited molded-in internal details",
      "Trimming and sheet waste matter",
      "Thickness varies after forming",
    ],
    steps: [
      "Heat a compatible plastic sheet",
      "Form over or into a tool using vacuum/pressure",
      "Cool and release the part",
      "Trim edges and openings",
    ],
  },
  {
    id: "injection",
    name: "Injection Molding",
    family: "Molding",
    desc: "Melt resin pellets and inject into a closed mold to produce repeatable parts.",
    best: "Detailed housings, ribs, bosses and snap features",
    pros: [
      "Good repeatability",
      "Integrated details",
      "Strong economics at sufficient volume",
    ],
    cons: [
      "Higher initial mold investment",
      "Draft and tooling access constraints",
      "Tool changes can be expensive",
    ],
    steps: [
      "Dry and prepare resin where required",
      "Plasticize and inject into mold",
      "Pack, cool and solidify",
      "Eject, inspect and finish",
    ],
  },
  {
    id: "fdm",
    name: "FDM 3D Printing",
    family: "Additive",
    desc: "Deposit thermoplastic filament in layers to build a part without dedicated molds.",
    best: "Prototypes and low-volume geometrically complex parts",
    pros: [
      "No mold tooling",
      "Fast design iteration",
      "Good for small runs",
    ],
    cons: [
      "Visible layer lines",
      "Build time per part",
      "Anisotropic properties and support cleanup",
    ],
    steps: [
      "Orient and slice 3D geometry",
      "Prepare filament and printer",
      "Print layer by layer",
      "Remove supports and finish",
    ],
  },
  {
    id: "cnc",
    name: "CNC Machining",
    family: "Subtractive",
    desc: "Remove material from solid stock using computer-controlled cutting tools.",
    best: "Precise simple parts, fixtures and some prototypes",
    pros: [
      "No dedicated mold",
      "Good precision potential",
      "Many stock materials",
    ],
    cons: [
      "Waste from stock removal",
      "Undercut/tool access limitations",
      "Can be expensive for thin shells",
    ],
    steps: [
      "Select stock and fixturing",
      "Program cutting operations",
      "Machine the part",
      "Deburr and inspect",
    ],
  },
];

export function getProcess(id: string) {
  return processes.find((p) => p.id === id);
}
