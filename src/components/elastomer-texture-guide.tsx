import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BUTTON_HARDNESS_GUIDE,
  ELASTOMER_GUIDE_DISCLAIMER,
  ELASTOMER_TEXTURES,
  SHORE_A_BANDS,
} from "@/data/elastomer-guide";
import type { ElastomerFeel, ElastomerTextureId } from "@/data/types";
import { BUTTON_FIT_LABELS } from "@/lib/material-labels";
import { cn } from "@/lib/utils";

const TEXTURE_SWATCH: Record<ElastomerTextureId, string> = {
  "smooth-matte": "bg-[#d9e2ec]",
  "smooth-gloss":
    "bg-gradient-to-br from-[#f7fafc] via-[#c5d4e4] to-[#8aa4bf]",
  "soft-touch": "bg-[#cfd8e3]",
  "light-texture":
    "bg-[#d5dee8] [background-image:radial-gradient(circle_at_1px_1px,#9aafc4_1px,transparent_0)] [background-size:6px_6px]",
  "heavy-grip":
    "bg-[#c5d0dc] [background-image:radial-gradient(circle_at_2px_2px,#6f879e_1.5px,transparent_0)] [background-size:8px_8px]",
  ribbed:
    "bg-[#d0dae5] [background-image:repeating-linear-gradient(90deg,#9eb2c5_0_2px,transparent_2px_7px)]",
  dotted:
    "bg-[#d5dee8] [background-image:radial-gradient(circle_at_center,#7f96ab_1.6px,transparent_1.8px)] [background-size:10px_10px]",
  "orange-peel":
    "bg-[#d2dbe6] [background-image:radial-gradient(circle_at_2px_2px,#a7b9ca_1px,transparent_1.4px)] [background-size:5px_5px]",
};

export function ElastomerTextureGuide({
  feel,
  compact = false,
}: {
  feel?: ElastomerFeel;
  compact?: boolean;
}) {
  const highlightBand = feel?.shoreABand;
  const highlightTextures = new Set(feel?.commonTextures ?? []);

  return (
    <Card className="mt-6 rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
      <CardHeader>
        <CardTitle className="text-lg">
          Button hardness & texture guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-[13px] leading-relaxed text-[#63748a]">
          {ELASTOMER_GUIDE_DISCLAIMER}
        </p>

        {feel && (
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-full bg-[#eaf2ff] px-2.5 py-1.5 text-xs font-semibold text-[#155ab5]">
              {SHORE_A_BANDS[feel.shoreABand].label}
            </Badge>
            <Badge className="rounded-full bg-[#f0f7f2] px-2.5 py-1.5 text-xs font-semibold text-[#217b50]">
              {BUTTON_FIT_LABELS[feel.buttonFit]}
            </Badge>
            <Badge className="rounded-full bg-[#edf3fa] px-2.5 py-1.5 text-xs font-semibold text-[#385b80]">
              {SHORE_A_BANDS[feel.shoreABand].feel}
            </Badge>
          </div>
        )}

        <div>
          <div className="mb-2 text-[11px] font-semibold tracking-wide text-[#8190a2] uppercase">
            Educational Shore A scale
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-[#e4eaf1]">
            <div className="absolute inset-y-0 left-[30%] right-[10%] rounded-full bg-[#b7d0f2]" />
            {highlightBand && highlightBand !== "wide" && (
              <div
                className="absolute inset-y-0 rounded-full bg-[#2877df]"
                style={{
                  left: `${SHORE_A_BANDS[highlightBand].range[0]}%`,
                  width: `${
                    SHORE_A_BANDS[highlightBand].range[1] -
                    SHORE_A_BANDS[highlightBand].range[0]
                  }%`,
                }}
              />
            )}
            {highlightBand === "wide" && (
              <div
                className="absolute inset-y-0 rounded-full bg-[#2877df]/70"
                style={{ left: "30%", width: "60%" }}
              />
            )}
          </div>
          <div className="mt-1 flex justify-between text-[11px] text-[#8190a2]">
            <span>Softer ~30</span>
            <span>Harder ~90</span>
          </div>
        </div>

        {!compact && (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {BUTTON_HARDNESS_GUIDE.map((row) => {
              const active =
                highlightBand === row.band || highlightBand === "wide";
              return (
                <div
                  key={row.band}
                  className={cn(
                    "rounded-xl border px-3 py-2.5",
                    active
                      ? "border-[#2877df] bg-[#eaf2ff]"
                      : "border-[#e2e8f0] bg-[#f7faff]"
                  )}
                >
                  <div className="text-sm font-semibold text-[#17263b]">
                    {row.title}
                  </div>
                  <div className="text-[12px] font-medium text-[#155ab5]">
                    {SHORE_A_BANDS[row.band].label}
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#63748a]">
                    {row.examples}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div>
          <div className="mb-2 text-[11px] font-semibold tracking-wide text-[#8190a2] uppercase">
            Surface textures for buttons & grips
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(
              Object.keys(ELASTOMER_TEXTURES) as ElastomerTextureId[]
            ).map((id) => {
              const meta = ELASTOMER_TEXTURES[id];
              const active = highlightTextures.has(id);
              return (
                <div
                  key={id}
                  className={cn(
                    "flex gap-3 rounded-xl border px-3 py-2.5",
                    active
                      ? "border-[#2877df] bg-[#eaf2ff]"
                      : "border-[#e2e8f0] bg-white"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 size-11 shrink-0 rounded-lg border border-[#cfd8e3]",
                      TEXTURE_SWATCH[id]
                    )}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#17263b]">
                      {meta.label}
                      {active && (
                        <span className="ml-2 text-[11px] font-bold text-[#155ab5]">
                          Common here
                        </span>
                      )}
                    </div>
                    <div className="text-[12px] text-[#52647b]">{meta.look}</div>
                    <p className="mt-1 text-[12px] leading-relaxed text-[#63748a]">
                      {meta.buttonNote}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
