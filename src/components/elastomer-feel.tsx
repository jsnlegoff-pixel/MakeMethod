import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ElastomerTextureGuide } from "@/components/elastomer-texture-guide";
import { SHORE_A_BANDS } from "@/data/elastomer-guide";
import type { ElastomerFeel } from "@/data/types";
import {
  BUTTON_FIT_LABELS,
  FLEXIBILITY_LABELS,
  GASKET_FIT_LABELS,
  PLIABILITY_LABELS,
  RECOVERY_LABELS,
} from "@/lib/material-labels";

const ROWS: {
  key: keyof Pick<
    ElastomerFeel,
    "flexibility" | "pliability" | "recovery" | "gasketFit" | "buttonFit"
  >;
  label: string;
  map: Record<string, string>;
}[] = [
  { key: "flexibility", label: "Flexibility", map: FLEXIBILITY_LABELS },
  { key: "pliability", label: "Pliability", map: PLIABILITY_LABELS },
  { key: "recovery", label: "Squeeze recovery", map: RECOVERY_LABELS },
  { key: "gasketFit", label: "Gasket / seal fit", map: GASKET_FIT_LABELS },
  { key: "buttonFit", label: "Button / keypad fit", map: BUTTON_FIT_LABELS },
];

export function ElastomerFeelPanel({ feel }: { feel: ElastomerFeel }) {
  return (
    <>
      <Card className="mt-6 rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
        <CardHeader>
          <CardTitle className="text-lg">
            Flexibility, sealing & button feel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[13px] leading-relaxed text-[#63748a]">
            Qualitative screening for gaskets, O-rings, soft goods, and rubber
            buttons — not datasheet values. Compounds and mold textures vary
            widely within each family.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ROWS.map((row) => (
              <div
                key={row.key}
                className="rounded-xl border border-[#e2e8f0] bg-[#f7faff] px-3 py-3"
              >
                <div className="text-[11px] font-semibold tracking-wide text-[#8190a2] uppercase">
                  {row.label}
                </div>
                <div className="mt-1 text-sm font-semibold text-[#17263b]">
                  {row.map[feel[row.key]]}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-wide text-[#8190a2] uppercase">
              Hardness guidance
            </div>
            <p className="mt-1 text-sm font-semibold text-[#155ab5]">
              {SHORE_A_BANDS[feel.shoreABand].label}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[#17263b]">
              {feel.hardnessGuidance}
            </p>
          </div>
          {feel.notes.length > 0 && (
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#17263b]">
              {feel.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <ElastomerTextureGuide feel={feel} />
    </>
  );
}

export function ElastomerFeelBadges({ feel }: { feel: ElastomerFeel }) {
  return (
    <>
      <Badge className="rounded-full bg-[#f0f7f2] px-2.5 py-1.5 text-[11px] font-semibold text-[#217b50]">
        {PLIABILITY_LABELS[feel.pliability]}
      </Badge>
      <Badge className="rounded-full bg-[#eaf2ff] px-2.5 py-1.5 text-[11px] font-semibold text-[#155ab5]">
        {SHORE_A_BANDS[feel.shoreABand].label}
      </Badge>
    </>
  );
}
