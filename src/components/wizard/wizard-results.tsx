import Link from "next/link";
import { AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Notice } from "@/components/notice";
import type { EvaluatedOption } from "@/data/types";
import type { WizardState } from "@/data/wizard";
import { cn } from "@/lib/utils";
import { money } from "@/lib/money";

export function WizardResults({
  state,
  results,
  onRestart,
  onEditPriorities,
}: {
  state: WizardState;
  results: EvaluatedOption[];
  onRestart: () => void;
  onEditPriorities: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge className="rounded-full bg-[#edf3fa] px-2.5 py-1.5 text-xs font-semibold text-[#385b80]">
          {state.quantity.toLocaleString()} units · {money(state.targetUnitCost)}
          /unit target
        </Badge>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onEditPriorities}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-9 rounded-[10px] border-[#d7e0eb] font-semibold"
            )}
          >
            Edit priorities
          </button>
          <button
            type="button"
            onClick={onRestart}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-9 rounded-[10px] border-[#d7e0eb] font-semibold"
            )}
          >
            <RotateCcw className="size-4" />
            Start over
          </button>
        </div>
      </div>

      <Notice>
        <strong>Illustrative model only.</strong> Costs are hypothetical
        planning inputs for a small, simple part, not verified supplier quotes.
        New wizard fields (category, dimensions, structural needs, target unit
        cost) inform explanations and light screens — they do not yet use an
        expanded property database or full ranking engine (Milestone 4).
      </Notice>

      {results.map((x, i) => (
        <article
          key={x.id}
          className="rounded-[14px] border border-[#e0e7f0] bg-white p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold tracking-[0.6px] text-[#2670cc]">
                {x.feasible ? "CANDIDATE" : "REQUIRES REVIEW"} · {i + 1}
              </div>
              <h3 className="mt-1.5 text-lg font-semibold text-[#17263b]">
                {x.name}
              </h3>
              <p className="mt-1 text-[13px] text-[#63748a]">{x.proc.best}</p>
            </div>
            <div className="shrink-0 text-right whitespace-nowrap">
              <strong className="text-[22px] text-[#17263b]">
                {money(x.total)}
              </strong>
              <div className="text-[13px] text-[#63748a]">
                {money(x.per)} / unit
              </div>
            </div>
          </div>
          <div className="mt-3 text-[13px] text-[#566a82]">
            Setup {money(x.setup)} · Variable {money(x.unit)} / unit
          </div>
          {x.cautions.length ? (
            <p className="mt-2 flex items-start gap-1.5 text-[13px] text-[#9b5a17]">
              <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
              {x.cautions.join(" · ")}
            </p>
          ) : (
            <p className="mt-2 flex items-start gap-1.5 text-[13px] text-[#267850]">
              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" />
              No obvious conflict with the selected high-level requirements
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href={`/processes/${x.process}`}
              className="text-[13px] font-bold text-[#2169c7] hover:underline"
            >
              Explore process →
            </Link>
            <Link
              href={`/materials/${x.material}`}
              className="text-[13px] font-bold text-[#2169c7] hover:underline"
            >
              Explore material →
            </Link>
          </div>
        </article>
      ))}

      <Notice>
        A feasibility shortlist is not an engineering approval. Obtain
        CAD/geometry review, grade-specific datasheets and supplier quotations
        before selection.
      </Notice>
    </div>
  );
}
