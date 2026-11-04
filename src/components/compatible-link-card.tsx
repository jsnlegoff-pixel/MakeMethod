"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getDfmRules } from "@/data/dfm-rules";
import type { MaterialFamily, MaterialId, ProcessId } from "@/data/types";
import { cn } from "@/lib/utils";

const PREVIEW_COUNT = 2;

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
  const set = getDfmRules({ processId, materialId, family });
  const rules = set?.rules ?? [];
  const preview = rules.slice(0, PREVIEW_COUNT);
  const rest = rules.slice(PREVIEW_COUNT);

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
              {preview.map((rule) => (
                <li
                  key={rule.id}
                  className="text-[12px] leading-snug text-[#17263b]"
                >
                  <span className="font-semibold text-[#385b80]">
                    {rule.title}.
                  </span>{" "}
                  <span className="text-[#52647b]">{truncateGuidance(rule.guidance)}</span>
                </li>
              ))}
            </ul>

            {rest.length > 0 && (
              <details className="group/dfm mt-2">
                <summary
                  className={cn(
                    "flex cursor-pointer list-none items-center gap-1 text-[12px] font-semibold text-[#2169c7]",
                    "[&::-webkit-details-marker]:hidden"
                  )}
                >
                  <ChevronDown className="size-3.5 transition group-open/dfm:rotate-180" />
                  {rest.length} more rule{rest.length === 1 ? "" : "s"}
                </summary>
                <ul className="mt-2 space-y-1.5 border-t border-[#e2e8f0] pt-2">
                  {rest.map((rule) => (
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
                {set?.disclaimer ? (
                  <p className="mt-2 text-[10px] leading-relaxed text-[#8a5a12]">
                    {set.disclaimer}
                  </p>
                ) : null}
              </details>
            )}

            {rest.length === 0 && set?.disclaimer ? (
              <p className="mt-2 text-[10px] leading-relaxed text-[#8a5a12]">
                Not shop standards — verify with tooling.
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

function truncateGuidance(text: string, max = 110) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 60 ? lastSpace : max).trimEnd()}…`;
}
