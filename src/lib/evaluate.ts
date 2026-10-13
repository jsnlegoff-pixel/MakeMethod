import { materials } from "@/data/materials";
import { processes } from "@/data/processes";
import type {
  AdvisorBrief,
  CostCombination,
  EvaluatedOption,
} from "@/data/types";

export function evaluateOptions(
  brief: AdvisorBrief,
  costRows: CostCombination[]
): EvaluatedOption[] {
  return costRows
    .map((x) => {
      const mat = materials.find((m) => m.id === x.material);
      const proc = processes.find((p) => p.id === x.process);
      if (!mat || !proc) {
        throw new Error(`Missing material/process for cost row ${x.id}`);
      }

      const cautions: string[] = [];
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
      return {
        ...x,
        mat,
        proc,
        total,
        per: total / brief.quantity,
        cautions,
        feasible: !cautions.some(
          (c) =>
            c.includes("exceeds") ||
            c.includes("unsuitable") ||
            c.includes("integrated")
        ),
      };
    })
    .sort(
      (a, b) =>
        Number(b.feasible) - Number(a.feasible) || a.total - b.total
    );
}
