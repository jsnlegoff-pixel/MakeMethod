import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FabricFeel } from "@/data/types";
import {
  ACOUSTIC_OPENNESS_LABELS,
  FABRIC_BREATHABILITY_LABELS,
  FABRIC_DRAPE_LABELS,
  FABRIC_HAND_LABELS,
  FABRIC_STRETCH_LABELS,
} from "@/lib/material-labels";

const ROWS: {
  key: keyof Pick<
    FabricFeel,
    "hand" | "drape" | "stretch" | "breathability" | "acousticOpenness"
  >;
  label: string;
  map: Record<string, string>;
}[] = [
  { key: "hand", label: "Hand / touch", map: FABRIC_HAND_LABELS },
  { key: "drape", label: "Drape", map: FABRIC_DRAPE_LABELS },
  { key: "stretch", label: "Stretch", map: FABRIC_STRETCH_LABELS },
  {
    key: "breathability",
    label: "Breathability",
    map: FABRIC_BREATHABILITY_LABELS,
  },
  {
    key: "acousticOpenness",
    label: "Acoustic openness",
    map: ACOUSTIC_OPENNESS_LABELS,
  },
];

export function FabricFeelPanel({ feel }: { feel: FabricFeel }) {
  return (
    <Card className="mt-6 rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
      <CardHeader>
        <CardTitle className="text-lg">
          Softgoods & acoustic feel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[13px] leading-relaxed text-[#63748a]">
          Qualitative screening for speaker cloth and softgoods — not lab
          acoustic curves or textile test methods. Construction, finish, and
          backing dominate real performance.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
            Construction guidance
          </div>
          <p className="mt-1 text-sm leading-relaxed text-[#17263b]">
            {feel.constructionGuidance}
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
  );
}

export function FabricFeelBadges({ feel }: { feel: FabricFeel }) {
  return (
    <>
      <Badge className="rounded-full bg-[#f5f0fa] px-2.5 py-1.5 text-[11px] font-semibold text-[#6b4f8a]">
        {FABRIC_HAND_LABELS[feel.hand]}
      </Badge>
      <Badge className="rounded-full bg-[#f5f0fa] px-2.5 py-1.5 text-[11px] font-semibold text-[#6b4f8a]">
        {ACOUSTIC_OPENNESS_LABELS[feel.acousticOpenness]}
      </Badge>
    </>
  );
}
