import { geometryOptions } from "@/data/wizard";
import type { WizardState } from "@/data/wizard";
import type { AdvisorBrief } from "@/data/types";

/** Map wizard selections onto the M1 screening brief. */
export function wizardToBrief(state: WizardState): AdvisorBrief {
  const geometry =
    geometryOptions.find((g) => g.value === state.geometry)?.mapsTo ?? "shell";

  return {
    quantity: Math.max(1, state.quantity),
    shape: geometry,
    size: state.size,
    environment: state.environment,
    finish: state.finish,
    priority: state.priority,
    budget: state.budget,
  };
}

/**
 * Extra explainable cautions from wizard-only fields.
 * These do not invent material property databases — they flag review needs.
 */
export function wizardExtraCautions(state: WizardState): string[] {
  const cautions: string[] = [];

  if (state.geometry === "flexible" && state.materialFamily === "plastic") {
    cautions.push(
      "Flexible geometry with a plastic preference may still need elastomer grades — confirm family fit"
    );
  }
  if (state.geometry === "flexible" && state.materialFamily === "unsure") {
    cautions.push(
      "Flexible/elastomeric parts often shortlist better under elastomer / rubber"
    );
  }
  if (state.geometry === "unsure") {
    cautions.push(
      "Geometry still uncertain — refine shape before locking a process"
    );
  }
  if (state.structural === "impact") {
    cautions.push(
      "Impact/drop duty needs grade-specific toughness review (not modeled in detail yet)"
    );
  }
  if (state.structural === "structural") {
    cautions.push(
      "Structural loads require engineering review beyond this planning screen"
    );
  }
  if (state.category === "electronics") {
    cautions.push(
      "Electronics housings may need EMI, flammability, or sealing checks with suppliers"
    );
  }
  if (state.materialFamily === "fabric") {
    cautions.push(
      "Fabric shortlist uses softgoods planning placeholders — sewing/lamination details are vendor-specific"
    );
  }
  if (state.materialFamily === "metal" && state.finish === "premium") {
    cautions.push(
      "Premium metal cosmetics may need plating, polishing, or anodize — confirm finish stack"
    );
  }

  return cautions;
}

export function sizeFromDimensions(
  lengthMm: number,
  widthMm: number,
  heightMm: number
): WizardState["size"] {
  const max = Math.max(lengthMm, widthMm, heightMm);
  if (max < 100) return "small";
  if (max <= 300) return "medium";
  return "large";
}
