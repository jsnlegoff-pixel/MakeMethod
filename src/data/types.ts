export type MaterialId = "hips" | "abs" | "pp" | "petg" | "pla" | "pcabs";
export type ProcessId = "thermo" | "injection" | "fdm" | "cnc";
export type ShapeId = "shell" | "tray" | "complex" | "solid";
export type SizeId = "small" | "medium" | "large";
export type EnvironmentId = "indoor" | "outdoor";
export type FinishId = "basic" | "standard" | "premium";
export type PriorityId = "cost" | "quality" | "flexibility";
export type BudgetId = "under1000" | "1000-5000" | "over5000";

export interface Material {
  id: MaterialId;
  name: string;
  full: string;
  desc: string;
  pros: string[];
  cons: string[];
  processes: ProcessId[];
}

export interface Process {
  id: ProcessId;
  name: string;
  family: string;
  desc: string;
  best: string;
  pros: string[];
  cons: string[];
  steps: string[];
}

export interface CostCombination {
  id: string;
  material: MaterialId;
  process: ProcessId;
  setup: number;
  unit: number;
  fit: ShapeId[];
  name: string;
}

export interface AdvisorBrief {
  quantity: number;
  shape: ShapeId;
  size: SizeId;
  environment: EnvironmentId;
  finish: FinishId;
  priority: PriorityId;
  budget: BudgetId;
}

export interface EvaluatedOption extends CostCombination {
  mat: Material;
  proc: Process;
  total: number;
  per: number;
  cautions: string[];
  feasible: boolean;
}
