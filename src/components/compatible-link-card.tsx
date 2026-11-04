"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getDfmRules } from "@/data/dfm-rules";
import {
  finishLabel,
  getFinishCompatibility,
} from "@/data/finishes";
import type {
  FinishCompatibilityNote,
  MaterialFamily,
  MaterialId,
  ProcessId,
} from "@/data/types";
import { cn } from "@/lib/utils";

const DFM_PREVIEW = 2;
const FINISH_PREVIEW = 3;

export function CompatibleLinkCard({
  href,
  title,
  description,
  processId,
  materialId,
  family,
}: {
  href: string;
  title: string;
  description: string;
  processId: ProcessId;
  materialId?: MaterialId;
  family?: MaterialFamily;
}) {
  const dfm = getDfmRules({ processId, materialId, family });
  const rules = dfm?.rules ?? [];
  const dfmPreview = rules.slice(0, DFM_PREVIEW);
  const dfmRest = rules.slice(DFM_PREVIEW);

  const finishes = getFinishCompatibility({ processId, materialId, family });
  const finishRows = finishes
    ? [
        ...finishes.compatible,
        ...finishes.conditional,
        ...finishes.incompatible.slice(0, 3),
      ]
    : [];
  const finishPreview = finishRows.slice(0, FINISH_PREVIEW);
  const finishRest = finishRows.slice(FINISH_PREVIEW);

  return (
    <Card className="h-full rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908] transition duration-150 hover:border-[#8eb7ef]">
      <CardContent className="flex h-full flex-col p-5">
        <Link href={href} className="group block">
          <h3 className="text-lg font-semibold text-[#17263b] group-hover:text-[#155ab5]">
            {title}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-[#63748a]">
            {description}
          </p>
        </Link>

        {rules.length > 0 && (
          <div className="mt-4 rounded-[10px] border border-[#e2e8f0] bg-[#f7faff] px-3 py-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-extrabold tracking-[0.5px] text-[#2670cc]">
                DFM
              </span>
              <Badge className="rounded-full bg-[#fff4df] px-2 py-0.5 text-[10px] font-semibold text-[#8a5a12]">
                Educational
              </Badge>
            </div>
            <ul className="mt-2 space-y-1.5">
              {dfmPreview.map((rule) => (
                <li
                  key={rule.id}
                  className="text-[12px] leading-snug text-[#17263b]"
                >
                  <span className="font-semibold text-[#385b80]">
                    {rule.title}.
                  </span>{" "}
                  <span className="text-[#52647b]">
                    {truncateGuidance(rule.guidance)}
                  </span>
                </li>
              ))}
            </ul>

            {dfmRest.length > 0 && (
              <details className="group/dfm mt-2">
                <summary
                  className={cn(
                    "flex cursor-pointer list-none items-center gap-1 text-[12px] font-semibold text-[#2169c7]",
                    "[&::-webkit-details-marker]:hidden"
                  )}
                >
                  <ChevronDown className="size-3.5 transition group-open/dfm:rotate-180" />
                  {dfmRest.length} more rule{dfmRest.length === 1 ? "" : "s"}
                </summary>
                <ul className="mt-2 space-y-1.5 border-t border-[#e2e8f0] pt-2">
                  {dfmRest.map((rule) => (
                    <li
                      key={rule.id}
                      className="text-[12px] leading-snug text-[#17263b]"
                    >
                      <span className="font-semibold text-[#385b80]">
                        {rule.title}.
                      </span>{" "}
                      <span className="text-[#52647b]">
                        {truncateGuidance(rule.guidance, 160)}
                      </span>
                    </li>
                  ))}
                </ul>
                {dfm?.disclaimer ? (
                  <p className="mt-2 text-[10px] leading-relaxed text-[#8a5a12]">
                    {dfm.disclaimer}
                  </p>
                ) : null}
              </details>
            )}

            {dfmRest.length === 0 && dfm?.disclaimer ? (
              <p className="mt-2 text-[10px] leading-relaxed text-[#8a5a12]">
                Not shop standards — verify with tooling.
              </p>
            ) : null}
          </div>
        )}

        {finishPreview.length > 0 && (
          <div className="mt-3 rounded-[10px] border border-[#e2e8f0] bg-[#fbfcfe] px-3 py-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-extrabold tracking-[0.5px] text-[#2670cc]">
                Finishes
              </span>
              <Badge className="rounded-full bg-[#fff4df] px-2 py-0.5 text-[10px] font-semibold text-[#8a5a12]">
                Educational · grade-dependent
              </Badge>
            </div>
            <ul className="mt-2 space-y-1.5">
              {finishPreview.map((row) => (
                <FinishRow key={row.id} row={row} />
              ))}
            </ul>

            {finishRest.length > 0 && (
              <details className="group/fin mt-2">
                <summary
                  className={cn(
                    "flex cursor-pointer list-none items-center gap-1 text-[12px] font-semibold text-[#2169c7]",
                    "[&::-webkit-details-marker]:hidden"
                  )}
                >
                  <ChevronDown className="size-3.5 transition group-open/fin:rotate-180" />
                  {finishRest.length} more finish
                  {finishRest.length === 1 ? "" : "es"}
                </summary>
                <ul className="mt-2 space-y-1.5 border-t border-[#e2e8f0] pt-2">
                  {finishRest.map((row) => (
                    <FinishRow key={row.id} row={row} />
                  ))}
                </ul>
                {finishes?.disclaimer ? (
                  <p className="mt-2 text-[10px] leading-relaxed text-[#8a5a12]">
                    {finishes.disclaimer}
                  </p>
                ) : null}
              </details>
            )}

            {finishRest.length === 0 && finishes?.disclaimer ? (
              <p className="mt-2 text-[10px] leading-relaxed text-[#8a5a12]">
                Screen only — confirm with the finisher and grade sheet.
              </p>
            ) : null}
          </div>
        )}

        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#2169c7] hover:underline"
        >
          Learn more
          <ArrowRight className="size-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}

function FinishRow({ row }: { row: FinishCompatibilityNote }) {
  return (
    <li className="text-[12px] leading-snug text-[#17263b]">
      <span className="inline-flex flex-wrap items-center gap-1.5">
        <span className="font-semibold text-[#385b80]">
          {finishLabel(row.finishId)}
        </span>
        <FitChip fit={row.fit} />
      </span>
      <span className="mt-0.5 block text-[#52647b]">
        {truncateGuidance(row.note, 120)}
      </span>
    </li>
  );
}

function FitChip({ fit }: { fit: FinishCompatibilityNote["fit"] }) {
  if (fit === "compatible") {
    return (
      <span className="rounded-full bg-[#e7f6ec] px-1.5 py-0.5 text-[10px] font-semibold text-[#1f6b3a]">
        Fits
      </span>
    );
  }
  if (fit === "conditional") {
    return (
      <span className="rounded-full bg-[#fff4df] px-1.5 py-0.5 text-[10px] font-semibold text-[#8a5a12]">
        Conditional
      </span>
    );
  }
  return (
    <span className="rounded-full bg-[#fdecec] px-1.5 py-0.5 text-[10px] font-semibold text-[#9b2c2c]">
      Avoid
    </span>
  );
}

function truncateGuidance(text: string, max = 110) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 60 ? lastSpace : max).trimEnd()}…`;
}
