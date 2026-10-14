import type { Process } from "../types";
import { processCatalog } from "./catalog";

export const processes: Process[] = processCatalog;

export function getProcess(id: string) {
  return processes.find((p) => p.id === id);
}

/** Materials that list this process as compatible. */
export function materialIdsForProcess(
  processId: string,
  materials: { id: string; processes: string[] }[]
) {
  return materials.filter((m) => m.processes.includes(processId));
}
