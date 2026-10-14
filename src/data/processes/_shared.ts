import type {
  DataConfidence,
  Process,
  ProcessIllustrationId,
} from "../types";

export function proc(input: {
  id: string;
  name: string;
  family: string;
  desc: string;
  best: string;
  pros: string[];
  cons: string[];
  steps: string[];
  typicalVolumes: string;
  tooling: string[];
  costDrivers: string[];
  dfm: string[];
  illustration: ProcessIllustrationId;
  confidence?: DataConfidence;
}): Process {
  return {
    ...input,
    confidence: input.confidence ?? "qualitative",
  };
}
