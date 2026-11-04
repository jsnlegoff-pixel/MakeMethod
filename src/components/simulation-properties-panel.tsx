import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notice } from "@/components/notice";
import {
  getSimulationProperties,
  simStatusExplainer,
  simStatusLabel,
} from "@/data/simulation-properties";
import { sourcedConfidenceLabel } from "@/data/sourced-properties";
import type { Material } from "@/data/types";

export function SimulationPropertiesPanel({ material }: { material: Material }) {
  const set = getSimulationProperties(material);
  if (!set) return null;

  const hasSourced = Boolean(set.sourcedGrade);

  return (
    <Card className="mt-6 rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-lg">
            {hasSourced
              ? "Properties for prelim simulation"
              : "Properties for prelim simulation"}
          </CardTitle>
          <Badge className="rounded-full bg-[#fff4df] px-2.5 py-1 text-[11px] font-semibold text-[#8a5a12]">
            {hasSourced
              ? "Sourced grade — verify before FEA"
              : "Educational — not a library export"}
          </Badge>
        </div>
        <p className="text-[13px] leading-relaxed font-normal text-[#63748a]">
          {hasSourced ? (
            <>
              Default commercial grade:{" "}
              <strong className="text-[#17263b]">
                {set.sourcedGrade!.gradeName}
              </strong>
              . Numbers below are taken from the cited sheet where available;
              blank rows mean the property was not on that datasheet.{" "}
              {set.qualitativeSummary}
            </>
          ) : (
            <>
              Plain-language expectations for FEA / SolidWorks-style screening.
              This is teaching context for {material.name} — not a paste-ready
              material card. {set.qualitativeSummary}
            </>
          )}
        </p>
        {set.sourcedGrade?.gradeNotes ? (
          <p className="text-[12px] leading-relaxed text-[#52647b]">
            {set.sourcedGrade.gradeNotes}
          </p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-3">
        <Notice>{set.disclaimer}</Notice>

        {!hasSourced && (
          <p className="text-[12px] leading-relaxed text-[#52647b]">
            <strong className="text-[#17263b]">How to read the table:</strong>{" "}
            each row names the property and the units you will later take from a
            datasheet. “No single number” / “Depends on grade” means suppliers
            publish different values — we are not inventing an FEA input here.
          </p>
        )}

        <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#f7faff] text-[11px] tracking-wide text-[#8190a2] uppercase">
                <th className="px-3 py-2 font-semibold">Property & units</th>
                <th className="px-3 py-2 font-semibold">
                  {hasSourced ? "Value / guidance" : "What to expect"}
                </th>
                <th className="px-3 py-2 font-semibold">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {set.fields.map((field) => {
                const sourced = field.sourced;
                return (
                  <tr
                    key={field.key}
                    className="border-t border-[#e8eef5] align-top"
                  >
                    <td className="px-3 py-2.5">
                      <div className="font-semibold text-[#17263b]">
                        {field.label}
                      </div>
                      <div className="mt-0.5 text-[11px] text-[#8190a2]">
                        {sourced ? sourced.unit : field.unitHint}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-[#17263b]">
                      {sourced ? (
                        <>
                          <div className="text-[22px] font-extrabold tracking-tight text-[#155ab5]">
                            {sourced.value}
                            <span className="ml-1 text-sm font-semibold text-[#385b80]">
                              {sourced.unit === "—" ? "" : sourced.unit}
                            </span>
                          </div>
                          <div className="mt-1 text-[12px] leading-snug text-[#52647b]">
                            {sourced.grade}
                          </div>
                          {sourced.method || sourced.condition ? (
                            <div className="mt-0.5 text-[11px] leading-snug text-[#8190a2]">
                              {[sourced.method, sourced.condition]
                                .filter(Boolean)
                                .join(" · ")}
                            </div>
                          ) : null}
                          <a
                            href={sourced.citation.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-block text-[12px] font-semibold text-[#2169c7] hover:underline"
                          >
                            {sourced.citation.title} ↗
                          </a>
                        </>
                      ) : (
                        <>
                          <div className="text-[13px] leading-snug">
                            {field.display}
                          </div>
                          {field.note ? (
                            <div className="mt-0.5 text-[12px] leading-snug text-[#63748a]">
                              {field.note}
                            </div>
                          ) : null}
                        </>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      {sourced ? (
                        <>
                          <Badge className="rounded-full bg-[#eaf2ff] px-2 py-1 text-[11px] font-semibold whitespace-nowrap text-[#155ab5]">
                            {sourcedConfidenceLabel(sourced.confidence)}
                          </Badge>
                          <div className="mt-1 max-w-[9.5rem] text-[10px] leading-snug text-[#8190a2]">
                            Verified {sourced.citation.verifiedAt}. Re-check
                            before FEA.
                          </div>
                        </>
                      ) : (
                        <>
                          <Badge
                            title={simStatusExplainer(field.status)}
                            className="rounded-full bg-[#edf3fa] px-2 py-1 text-[11px] font-semibold whitespace-nowrap text-[#385b80]"
                          >
                            {hasSourced &&
                            field.display.startsWith("Not on datasheet")
                              ? "Not on datasheet"
                              : simStatusLabel(field.status)}
                          </Badge>
                          <div className="mt-1 max-w-[9.5rem] text-[10px] leading-snug text-[#8190a2]">
                            {hasSourced &&
                            field.display.startsWith("Not on datasheet")
                              ? "Left blank — do not invent a value."
                              : simStatusExplainer(field.status)}
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {hasSourced && set.sourcedGrade && (
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f7faff] px-3 py-3">
            <div className="text-[11px] font-semibold tracking-wide text-[#8190a2] uppercase">
              Sources (last verified {set.sourcedGrade.verifiedAt})
            </div>
            <ul className="mt-2 space-y-1.5">
              {set.sourcedGrade.citations.map((c) => (
                <li key={c.id} className="text-[12px] leading-snug">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-[#2169c7] hover:underline"
                  >
                    {c.title}
                  </a>
                  <span className="text-[#63748a]"> — {c.publisher}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {set.designConsiderations.length > 0 && (
          <details className="rounded-xl border border-[#e2e8f0] bg-[#f7faff] px-3 py-2.5">
            <summary className="cursor-pointer text-sm font-semibold text-[#17263b] [&::-webkit-details-marker]:hidden">
              Design considerations ({set.designConsiderations.length})
            </summary>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-[#17263b]">
              {set.designConsiderations.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </details>
        )}

        <p className="text-[12px] leading-relaxed text-[#63748a]">
          {set.solidworksNote}
        </p>
      </CardContent>
    </Card>
  );
}
