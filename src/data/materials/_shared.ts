import {
  PROPERTY_DISCLAIMER,
  type DataConfidence,
  type Material,
  type MaterialFamily,
  type MaterialProperties,
  type MaterialTag,
  type ProcessId,
  type RelativeLevel,
} from "../types";

export function qualitativeProps(
  summary: string,
  notes: string[],
  confidence: DataConfidence = "qualitative"
): MaterialProperties {
  return {
    summary,
    notes,
    confidence,
    disclaimer: PROPERTY_DISCLAIMER,
  };
}

export function mat(input: {
  id: string;
  name: string;
  full: string;
  family: MaterialFamily;
  desc: string;
  applications: string[];
  pros: string[];
  cons: string[];
  processes: ProcessId[];
  relativeCost: RelativeLevel;
  summary: string;
  propertyNotes: string[];
  designConsiderations: string[];
  relativeCostConfidence?: DataConfidence;
  propertyConfidence?: DataConfidence;
  tags?: MaterialTag[];
}): Material {
  return {
    id: input.id,
    name: input.name,
    full: input.full,
    family: input.family,
    desc: input.desc,
    applications: input.applications,
    pros: input.pros,
    cons: input.cons,
    processes: input.processes,
    relativeCost: input.relativeCost,
    relativeCostConfidence:
      input.relativeCostConfidence ?? "qualitative",
    properties: qualitativeProps(
      input.summary,
      input.propertyNotes,
      input.propertyConfidence ?? "qualitative"
    ),
    designConsiderations: input.designConsiderations,
    illustration: input.family,
    tags: input.tags ?? [],
  };
}
