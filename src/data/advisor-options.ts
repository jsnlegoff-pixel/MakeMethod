import type {
  BudgetId,
  EnvironmentId,
  FinishId,
  PriorityId,
  ShapeId,
  SizeId,
} from "./types";

export const shapeOptions: { value: ShapeId; label: string }[] = [
  { value: "shell", label: "Open-backed shell / cover" },
  { value: "tray", label: "Shallow tray" },
  { value: "complex", label: "Detailed part with internal features" },
  { value: "solid", label: "Solid mechanical component" },
];

export const sizeOptions: { value: SizeId; label: string }[] = [
  { value: "small", label: "Small (under 100 mm)" },
  { value: "medium", label: "Medium (100–300 mm)" },
  { value: "large", label: "Large (over 300 mm)" },
];

export const environmentOptions: { value: EnvironmentId; label: string }[] = [
  { value: "indoor", label: "Indoor" },
  { value: "outdoor", label: "Outdoor" },
];

export const finishOptions: { value: FinishId; label: string }[] = [
  { value: "basic", label: "Basic" },
  { value: "standard", label: "Standard consumer finish" },
  { value: "premium", label: "Premium cosmetic finish" },
];

export const priorityOptions: { value: PriorityId; label: string }[] = [
  { value: "cost", label: "Lowest total cost" },
  { value: "quality", label: "Surface finish / quality" },
  { value: "flexibility", label: "Low setup / design flexibility" },
];

export const budgetOptions: { value: BudgetId; label: string }[] = [
  { value: "under1000", label: "Under $1,000" },
  { value: "1000-5000", label: "$1,000–$5,000" },
  { value: "over5000", label: "Over $5,000" },
];

export const defaultAdvisorBrief = {
  quantity: 500,
  shape: "shell" as const,
  size: "small" as const,
  environment: "indoor" as const,
  finish: "standard" as const,
  priority: "cost" as const,
  budget: "1000-5000" as const,
};
