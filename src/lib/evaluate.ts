import { materials } from "@/data/materials";
import { processes } from "@/data/processes";
import type {
  AdvisorBrief,
  CostCombination,
  EvaluatedOption,
} from "@/data/types";

export type EvaluateExtras = {
  targetUnitCost?: number;
  extraCautions?: string[];
};

export function evaluateOptions(
  brief: AdvisorBrief,
  costRows: CostCombination[],
  extras: EvaluateExtras = {}
): EvaluatedOption[] {
  const sharedExtras = extras.extraCautions ?? [];

  return costRows
    .map((x) => {
      const mat = materials.find((m) => m.id === x.material);
      const proc = processes.find((p) => p.id === x.process);
      if (!mat || !proc) {
        throw new Error(`Missing material/process for cost row ${x.id}`);
      }

      const cautions: string[] = [...sharedExtras];
      if (!x.fit.includes(brief.shape)) {
        cautions.push("Geometry may be unsuitable");
      }
      if (brief.shape === "complex" && x.process === "thermo") {
        cautions.push("Cannot easily form integrated internal details");
      }
      if (
        brief.environment === "outdoor" &&
        ["hips", "abs", "pla"].includes(x.material)
      ) {
        cautions.push(
          "Verify UV/weathering performance or stabilized grade"
        );
      }
      if (brief.finish === "premium" && x.process === "fdm") {
        cautions.push("Finishing likely required");
      }
      if (brief.size === "large") {
        cautions.push("Assumed unit pricing may not apply at this size");
      }
      if (
        (brief.budget === "under1000" && x.setup > 1000) ||
        (brief.budget === "1000-5000" && x.setup > 5000)
      ) {
        cautions.push("Tooling exceeds selected budget");
      }

      const total = x.setup + x.unit * brief.quantity;
      const per = total / brief.quantity;

      if (
        extras.targetUnitCost != null &&
        extras.targetUnitCost > 0 &&
        per > extras.targetUnitCost
      ) {
        cautions.push(
          `Modeled unit cost exceeds $${extras.targetUnitCost.toLocaleString("en-US")} target`
        );
      }

      if (brief.priority === "quality" && x.process === "fdm") {
        cautions.push(
          "Priority is surface quality — FDM may need substantial finishing"
        );
      }
      if (brief.priority === "flexibility" && x.setup > 2000) {
        cautions.push(
          "Priority is low setup / flexibility — higher tooling spend may conflict"
        );
      }

      return {
        ...x,
        mat,
        proc,
        total,
        per,
        cautions,
        feasible: !cautions.some(
          (c) =>
            c.includes("exceeds") ||
            c.includes("unsuitable") ||
            c.includes("integrated")
        ),
      };
    })
    .sort((a, b) => {
      const feasibleDelta = Number(b.feasible) - Number(a.feasible);
      if (feasibleDelta !== 0) return feasibleDelta;

      if (brief.priority === "flexibility") {
        return a.setup - b.setup || a.total - b.total;
      }
      if (brief.priority === "quality") {
        const score = (opt: EvaluatedOption) =>
          (opt.process === "injection" ? 0 : 1) +
          (opt.process === "fdm" ? 2 : 0) +
          (opt.cautions.some((c) => c.includes("Finishing")) ? 1 : 0);
        return score(a) - score(b) || a.total - b.total;
      }

      return a.total - b.total;
    });
}
