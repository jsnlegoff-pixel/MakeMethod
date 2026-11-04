import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notice } from "@/components/notice";
import { dfmTopicLabel, getDfmRules } from "@/data/dfm-rules";
import { getMaterial } from "@/data/materials";
import { getProcess } from "@/data/processes";
import type { MaterialFamily, MaterialId, ProcessId } from "@/data/types";
import { familyLabel } from "@/lib/material-labels";
import { cn } from "@/lib/utils";

export function DfmRulesPanel({
  processId,
  materialId,
  family,
  compact = false,
  className,
}: {
  processId: ProcessId;
  materialId?: MaterialId;
  family?: MaterialFamily;
  /** Tighter layout for wizard result cards. */
  compact?: boolean;
  className?: string;
}) {
  const set = getDfmRules({ processId, materialId, family });
  if (!set || set.rules.length === 0) return null;

  const process = getProcess(processId);
  const material = materialId ? getMaterial(materialId) : undefined;
  const resolvedFamily = family ?? material?.family;

  const title = material
    ? `DFM · ${material.name} + ${process?.name ?? processId}`
    : `DFM rules of thumb${process ? ` · ${process.name}` : ""}`;

  return (
    <Card
      className={cn(
        "rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]",
        compact ? "mt-3" : "mt-6",
        className
      )}
    >
      <CardHeader className={cn("space-y-2", compact && "px-4 pt-4 pb-2")}>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className={cn(compact ? "text-base" : "text-lg")}>
            {title}
          </CardTitle>
          <Badge className="rounded-full bg-[#fff4df] px-2.5 py-1 text-[11px] font-semibold text-[#8a5a12]">
            Educational — not shop standards
          </Badge>
          {resolvedFamily ? (
            <Badge className="rounded-full bg-[#edf3fa] px-2.5 py-1 text-[11px] font-semibold text-[#385b80]">
              {familyLabel(resolvedFamily)}
            </Badge>
          ) : null}
        </div>
        {!compact && (
          <p className="text-[13px] leading-relaxed font-normal text-[#63748a]">
            Material + process pairing guidance for walls, draft, bends, holes,
            ribs, and related features.
          </p>
        )}
      </CardHeader>
      <CardContent className={cn("space-y-3", compact && "px-4 pb-4")}>
        {!compact && <Notice>{set.disclaimer}</Notice>}
        {compact && (
          <p className="text-[12px] leading-relaxed text-[#8a5a12]">
            {set.disclaimer}
          </p>
        )}

        <ul className="space-y-2.5">
          {set.rules.map((rule) => (
            <li
              key={rule.id}
              className="rounded-xl border border-[#e2e8f0] bg-[#f7faff] px-3 py-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold tracking-wide text-[#8190a2] uppercase">
                  {dfmTopicLabel(rule.topic)}
                </span>
                <span className="text-sm font-semibold text-[#17263b]">
                  {rule.title}
                </span>
              </div>
              <p
                className={cn(
                  "mt-1 leading-relaxed text-[#17263b]",
                  compact ? "text-[13px]" : "text-sm"
                )}
              >
                {rule.guidance}
              </p>
            </li>
          ))}
        </ul>

        {!compact && material && process && (
          <p className="text-[12px] text-[#63748a]">
            Pairing:{" "}
            <Link
              href={`/materials/${material.id}`}
              className="font-semibold text-[#2169c7] hover:underline"
            >
              {material.name}
            </Link>
            {" · "}
            <Link
              href={`/processes/${process.id}`}
              className="font-semibold text-[#2169c7] hover:underline"
            >
              {process.name}
            </Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/** Compact DFM strip for wizard candidate cards. */
export function DfmRulesCompact({
  processId,
  materialId,
}: {
  processId: ProcessId;
  materialId: MaterialId;
}) {
  const set = getDfmRules({ processId, materialId });
  if (!set || set.rules.length === 0) return null;

  const top = set.rules.slice(0, 3);

  return (
    <div className="mt-3 rounded-[10px] border border-[#e2e8f0] bg-[#f7faff] px-3 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-extrabold tracking-[0.5px] text-[#2670cc]">
          DFM RULES OF THUMB
        </span>
        <Badge className="rounded-full bg-[#fff4df] px-2 py-0.5 text-[10px] font-semibold text-[#8a5a12]">
          Educational
        </Badge>
      </div>
      <ul className="mt-2 space-y-1.5">
        {top.map((rule) => (
          <li key={rule.id} className="text-[12px] leading-relaxed text-[#17263b]">
            <span className="font-semibold text-[#385b80]">
              {rule.title}.
            </span>{" "}
            {rule.guidance}
          </li>
        ))}
      </ul>
      {set.rules.length > 3 ? (
        <p className="mt-2 text-[11px] text-[#63748a]">
          +{set.rules.length - 3} more on the material and process detail pages.
        </p>
      ) : (
        <p className="mt-2 text-[11px] text-[#8a5a12]">{set.disclaimer}</p>
      )}
    </div>
  );
}
