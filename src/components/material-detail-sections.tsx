"use client";

import { useState } from "react";
import { CompatibleLinkCard } from "@/components/compatible-link-card";
import { SimulationPropertiesPanel } from "@/components/simulation-properties-panel";
import type { Material, Process } from "@/data/types";
import { getSourcedGrades } from "@/data/sourced-properties";
import { cn } from "@/lib/utils";

type SectionTab = "processes" | "grades";

export function MaterialDetailSections({
  material,
  linked,
}: {
  material: Material;
  linked: Process[];
}) {
  const [section, setSection] = useState<SectionTab>("processes");
  const gradeCount = getSourcedGrades(material.id).length;

  return (
    <div className="mt-8">
      <div className="border-b border-[#d8e2ee] bg-[#edf2f8] px-3 pt-3 sm:rounded-t-2xl sm:px-4">
        <div className="mb-2 px-1 text-[11px] font-semibold tracking-wide text-[#8190a2] uppercase">
          Explore this material
        </div>
        <div
          role="tablist"
          aria-label="Material detail sections"
          className="flex flex-wrap gap-1.5"
        >
          <SectionTabButton
            id="processes"
            label="Compatible processes"
            selected={section === "processes"}
            onSelect={setSection}
            hint={
              linked.length > 0
                ? `${linked.length} process${linked.length === 1 ? "" : "es"}`
                : undefined
            }
          />
          <SectionTabButton
            id="grades"
            label="Commercial grades"
            selected={section === "grades"}
            onSelect={setSection}
            hint={
              gradeCount > 0
                ? `${gradeCount} sourced grade${gradeCount === 1 ? "" : "s"}`
                : "Family guidance"
            }
          />
        </div>
      </div>

      <div className="rounded-b-2xl border border-t-0 border-[#e2e8f0] bg-white px-4 py-5 sm:px-5">
        {section === "processes" ? (
          <div
            role="tabpanel"
            id="material-panel-processes"
            aria-labelledby="material-section-processes"
          >
            <h2 className="text-[22px] font-bold tracking-tight text-[#17263b] sm:text-[26px]">
              Compatible processes
            </h2>
            <p className="mt-1.5 mb-4 max-w-[720px] text-[13px] leading-relaxed text-[#63748a]">
              Each process card includes educational DFM rules and finish
              compatibility notes for this pairing — not shop standards or
              coating certs.
            </p>
            {linked.length === 0 ? (
              <div className="rounded-2xl border border-[#e2e8f0] bg-[#f7faff] px-7 py-10 text-center text-[#66778d]">
                No compatible processes listed yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {linked.map((y) => (
                  <CompatibleLinkCard
                    key={y.id}
                    href={`/processes/${y.id}`}
                    title={y.name}
                    description={y.desc}
                    processId={y.id}
                    materialId={material.id}
                    family={material.family}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            role="tabpanel"
            id="material-panel-grades"
            aria-labelledby="material-section-grades"
          >
            <h2 className="text-[22px] font-bold tracking-tight text-[#17263b] sm:text-[26px]">
              Commercial grades &amp; simulation properties
            </h2>
            <p className="mt-1.5 mb-2 max-w-[720px] text-[13px] leading-relaxed text-[#63748a]">
              Switch named datasheet grades inside the panel below. Numbers are
              sourced only — blank means not on that sheet.
            </p>
            <SimulationPropertiesPanel material={material} embedded />
          </div>
        )}
      </div>
    </div>
  );
}

function SectionTabButton({
  id,
  label,
  selected,
  onSelect,
  hint,
}: {
  id: SectionTab;
  label: string;
  selected: boolean;
  onSelect: (id: SectionTab) => void;
  hint?: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={`material-section-${id}`}
      aria-selected={selected}
      aria-controls={`material-panel-${id}`}
      onClick={() => onSelect(id)}
      className={cn(
        "relative rounded-t-[10px] border border-b-0 px-3.5 py-2.5 text-left transition-colors sm:px-4",
        selected
          ? "-mb-px border-[#d8e2ee] bg-white text-[#17263b] shadow-[0_-1px_0_#fff]"
          : "border-transparent bg-[#dce5f0] text-[#52647b] hover:bg-[#d2dde9] hover:text-[#17263b]"
      )}
    >
      <span className="block text-[14px] font-bold sm:text-[15px]">{label}</span>
      {hint ? (
        <span className="mt-0.5 block text-[11px] font-medium text-[#8190a2]">
          {hint}
        </span>
      ) : null}
    </button>
  );
}
