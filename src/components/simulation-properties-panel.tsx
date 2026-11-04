import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notice } from "@/components/notice";
import {
  getSimulationProperties,
  simStatusLabel,
} from "@/data/simulation-properties";
import type { Material } from "@/data/types";

export function SimulationPropertiesPanel({ material }: { material: Material }) {
  const set = getSimulationProperties(material);
  if (!set) return null;

  return (
    <Card className="mt-6 rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
      <CardHeader className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-lg">
            Simulation-ready properties
          </CardTitle>
          <Badge className="rounded-full bg-[#fff4df] px-2.5 py-1 text-[11px] font-semibold text-[#8a5a12]">
            Unverified / educational
          </Badge>
        </div>
        <p className="text-[13px] leading-relaxed font-normal text-[#63748a]">
          Preliminaries for FEA / SolidWorks-style screening — not paste-ready
          library numbers. {set.qualitativeSummary}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Notice>{set.disclaimer}</Notice>

        <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#f7faff] text-[11px] tracking-wide text-[#8190a2] uppercase">
                <th className="px-3 py-2.5 font-semibold">Property</th>
                <th className="px-3 py-2.5 font-semibold">Guidance</th>
                <th className="px-3 py-2.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {set.fields.map((field) => (
                <tr
                  key={field.key}
                  className="border-t border-[#e8eef5] align-top"
                >
                  <td className="px-3 py-3">
                    <div className="font-semibold text-[#17263b]">
                      {field.label}
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#8190a2]">
                      Unit hint: {field.unitHint}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[#17263b]">
                    <div>{field.display}</div>
                    {field.note ? (
                      <div className="mt-1 text-[12px] leading-relaxed text-[#63748a]">
                        {field.note}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <Badge className="rounded-full bg-[#edf3fa] px-2 py-1 text-[11px] font-semibold text-[#385b80]">
                      {simStatusLabel(field.status)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {set.designConsiderations.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-[#17263b]">
              Design considerations
            </h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#17263b]">
              {set.designConsiderations.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-[12px] leading-relaxed text-[#63748a]">
          {set.solidworksNote}
        </p>
      </CardContent>
    </Card>
  );
}
