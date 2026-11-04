import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getSimulationProperties } from "@/data/simulation-properties";
import {
  sourcedConfidenceLabel,
  type SourcedGradeRecord,
} from "@/data/sourced-properties";
import type { Material } from "@/data/types";

/** Cap how many property rows show before “N more” to keep cards scannable. */
const PROPERTY_PREVIEW = 5;

export function CommercialGradeCard({
  material,
  grade,
}: {
  material: Material;
  grade: SourcedGradeRecord;
}) {
  const set = getSimulationProperties(material, grade.id);
  const sourcedFields =
    set?.fields.filter((f) => f.sourced) ??
    [];
  const preview = sourcedFields.slice(0, PROPERTY_PREVIEW);
  const rest = sourcedFields.slice(PROPERTY_PREVIEW);
  const primaryCitation = grade.citations[0];

  return (
    <Card className="h-full rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
      <CardContent className="flex h-full flex-col p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-[#17263b]">
              {grade.gradeName}
            </h3>
            {grade.tabLabel !== grade.gradeName ? (
              <p className="mt-0.5 text-[12px] font-medium text-[#8190a2]">
                {grade.tabLabel}
                {grade.isDefault ? " · default" : ""}
              </p>
            ) : grade.isDefault ? (
              <p className="mt-0.5 text-[12px] font-medium text-[#8190a2]">
                Default grade
              </p>
            ) : null}
          </div>
          <Badge className="rounded-full bg-[#fff4df] px-2.5 py-1 text-[11px] font-semibold text-[#8a5a12]">
            Sourced — verify before FEA
          </Badge>
        </div>

        {grade.gradeNotes ? (
          <p className="mt-3 text-[13px] leading-relaxed text-[#63748a]">
            {grade.gradeNotes}
          </p>
        ) : null}

        {preview.length === 0 ? (
          <p className="mt-4 text-[13px] text-[#66778d]">
            No numeric properties recorded for this grade yet — see the cited
            sheet.
          </p>
        ) : (
          <div className="mt-4 rounded-[10px] border border-[#e2e8f0] bg-[#f7faff] px-3 py-2.5">
            <div className="text-[10px] font-extrabold tracking-[0.5px] text-[#2670cc]">
              KEY PROPERTIES
            </div>
            <ul className="mt-2 divide-y divide-[#e2e8f0]">
              {preview.map((field) => {
                const s = field.sourced!;
                return (
                  <li
                    key={field.key}
                    className="flex items-baseline justify-between gap-3 py-2 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <div className="text-[12px] font-semibold text-[#17263b]">
                        {field.label}
                      </div>
                      {(s.method || s.condition) && (
                        <div className="mt-0.5 text-[10px] leading-snug text-[#8190a2]">
                          {[s.method, s.condition].filter(Boolean).join(" · ")}
                        </div>
                      )}
                      <div className="mt-0.5 text-[10px] text-[#8190a2]">
                        {sourcedConfidenceLabel(s.confidence)}
                      </div>
                    </div>
                    <div className="shrink-0 text-right text-[18px] font-extrabold tracking-tight text-[#155ab5]">
                      {s.value}
                      <span className="ml-0.5 text-[11px] font-semibold text-[#385b80]">
                        {s.unit === "—" ? "" : s.unit}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
            {rest.length > 0 ? (
              <details className="mt-1 border-t border-[#e2e8f0] pt-2">
                <summary className="cursor-pointer text-[11px] font-semibold text-[#2169c7] [&::-webkit-details-marker]:hidden">
                  {rest.length} more propert{rest.length === 1 ? "y" : "ies"}
                </summary>
                <ul className="mt-1 divide-y divide-[#e2e8f0]">
                  {rest.map((field) => {
                    const s = field.sourced!;
                    return (
                      <li
                        key={field.key}
                        className="flex items-baseline justify-between gap-3 py-2"
                      >
                        <div className="text-[12px] font-semibold text-[#17263b]">
                          {field.label}
                        </div>
                        <div className="shrink-0 text-right text-[15px] font-extrabold text-[#155ab5]">
                          {s.value}
                          <span className="ml-0.5 text-[11px] font-semibold text-[#385b80]">
                            {s.unit === "—" ? "" : s.unit}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </details>
            ) : null}
          </div>
        )}

        <div className="mt-auto pt-4">
          <div className="text-[10px] font-semibold tracking-wide text-[#8190a2] uppercase">
            Citation{grade.citations.length === 1 ? "" : "s"} · verified{" "}
            {grade.verifiedAt}
          </div>
          <ul className="mt-1.5 space-y-1">
            {(primaryCitation ? grade.citations : []).map((c) => (
              <li key={c.id} className="text-[12px] leading-snug">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#2169c7] hover:underline"
                >
                  {c.title} ↗
                </a>
                <span className="text-[#63748a]"> — {c.publisher}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

/** When no named datasheet grades exist yet — family guidance only. */
export function FamilyGuidanceCard({ material }: { material: Material }) {
  const set = getSimulationProperties(material, null);
  if (!set) return null;

  return (
    <Card className="h-full rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908] md:col-span-2 xl:col-span-3">
      <CardContent className="p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-[#17263b]">
            Family guidance — {material.name}
          </h3>
          <Badge className="rounded-full bg-[#edf3fa] px-2.5 py-1 text-[11px] font-semibold text-[#385b80]">
            Educational — not a library export
          </Badge>
        </div>
        <p className="mt-2 max-w-[720px] text-[13px] leading-relaxed text-[#63748a]">
          No named commercial grades are sourced for this material yet.{" "}
          {set.qualitativeSummary} Use a supplier datasheet before FEA — we do
          not invent numbers here.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {set.fields.map((field) => (
            <li
              key={field.key}
              className="rounded-[10px] border border-[#e2e8f0] bg-[#f7faff] px-3 py-2.5"
            >
              <div className="text-[12px] font-semibold text-[#17263b]">
                {field.label}
              </div>
              <div className="mt-0.5 text-[11px] text-[#8190a2]">
                {field.unitHint}
              </div>
              <p className="mt-1.5 text-[12px] leading-snug text-[#52647b]">
                {field.display}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[12px] leading-relaxed text-[#63748a]">
          {set.disclaimer}
        </p>
      </CardContent>
    </Card>
  );
}
