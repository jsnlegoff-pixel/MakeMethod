import type { CostCombination } from "./types";

export const costs: CostCombination[] = [
  {
    id: "hips-thermo",
    material: "hips",
    process: "thermo",
    setup: 1500,
    unit: 3.5,
    fit: ["shell", "tray"],
    name: "HIPS + Thermoforming",
  },
  {
    id: "abs-thermo",
    material: "abs",
    process: "thermo",
    setup: 1800,
    unit: 4.5,
    fit: ["shell", "tray"],
    name: "ABS + Thermoforming",
  },
  {
    id: "petg-fdm",
    material: "petg",
    process: "fdm",
    setup: 0,
    unit: 9,
    fit: ["shell", "complex", "solid", "tray"],
    name: "PETG + FDM Printing",
  },
  {
    id: "pp-injection",
    material: "pp",
    process: "injection",
    setup: 3500,
    unit: 2,
    fit: ["shell", "complex", "solid", "tray"],
    name: "PP + Injection Molding",
  },
  {
    id: "abs-injection",
    material: "abs",
    process: "injection",
    setup: 4000,
    unit: 2.5,
    fit: ["shell", "complex", "solid", "tray"],
    name: "ABS + Injection Molding",
  },
];
