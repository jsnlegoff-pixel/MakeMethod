"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eyebrow } from "@/components/eyebrow";
import { Notice } from "@/components/notice";
import {
  budgetOptions,
  defaultAdvisorBrief,
  environmentOptions,
  finishOptions,
  priorityOptions,
  shapeOptions,
  sizeOptions,
} from "@/data/advisor-options";
import { costs as initialCosts } from "@/data/costs";
import type { AdvisorBrief } from "@/data/types";
import { evaluateOptions } from "@/lib/evaluate";
import { money } from "@/lib/money";

export function AdvisorPanel() {
  const [brief, setBrief] = useState<AdvisorBrief>(defaultAdvisorBrief);
  const results = useMemo(
    () => evaluateOptions(brief, initialCosts),
    [brief]
  );

  function setField<K extends keyof AdvisorBrief>(key: K, value: AdvisorBrief[K]) {
    setBrief((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div>
      <Eyebrow>Decision Support</Eyebrow>
      <h1 className="mt-2 text-[clamp(32px,5vw,43px)] font-bold tracking-tight text-[#17263b]">
        Find your manufacturing method.
      </h1>
      <p className="mt-3 max-w-[750px] leading-relaxed text-[#63748a]">
        Enter what you know about your product. The shortlist updates based on
        basic geometry and budget screening, then compares hypothetical
        production costs.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-[18px] lg:grid-cols-2">
        <Card className="rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
          <CardHeader>
            <CardTitle className="text-lg">Your product brief</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-[13px] font-bold text-[#344c66]">
                Production quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min={1}
                max={1000000}
                value={brief.quantity}
                onChange={(e) =>
                  setField("quantity", Math.max(1, Number(e.target.value) || 1))
                }
                className="h-11 rounded-[10px] border-[#ccd7e4]"
              />
            </div>

            <FieldSelect
              label="Part geometry"
              value={brief.shape}
              options={shapeOptions}
              onChange={(v) => setField("shape", v)}
            />
            <FieldSelect
              label="Part size"
              value={brief.size}
              options={sizeOptions}
              onChange={(v) => setField("size", v)}
            />
            <FieldSelect
              label="Environment"
              value={brief.environment}
              options={environmentOptions}
              onChange={(v) => setField("environment", v)}
            />
            <FieldSelect
              label="Appearance"
              value={brief.finish}
              options={finishOptions}
              onChange={(v) => setField("finish", v)}
            />
            <FieldSelect
              label="Main priority"
              value={brief.priority}
              options={priorityOptions}
              onChange={(v) => setField("priority", v)}
            />
            <FieldSelect
              label="Tooling budget"
              value={brief.budget}
              options={budgetOptions}
              onChange={(v) => setField("budget", v)}
            />

            <Button
              variant="outline"
              onClick={() => setBrief(defaultAdvisorBrief)}
              className="h-11 rounded-[10px] border-[#d7e0eb] font-semibold text-[#243b57]"
            >
              <RotateCcw data-icon="inline-start" />
              Reset to example
            </Button>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[28px] font-bold tracking-tight text-[#17263b]">
              Preliminary shortlist
            </h2>
            <Badge className="rounded-full bg-[#edf3fa] px-2.5 py-1.5 text-xs font-semibold text-[#385b80]">
              {brief.quantity.toLocaleString()} units
            </Badge>
          </div>

          <Notice>
            <strong>Illustrative model only.</strong> Costs are hypothetical
            planning inputs for a small, simple part, not verified supplier
            quotes. Geometry, finish, location, labor, trimming, inspection,
            assembly and supplier capacity can change actual costs. Outdoor use,
            large sizes and complex features require additional engineering
            review.
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
              <Link
                href={`/processes/${x.process}`}
                className="mt-3 inline-block text-[13px] font-bold text-[#2169c7] hover:underline"
              >
                Explore process →
              </Link>
            </article>
          ))}

          <Notice>
            A feasibility shortlist is not an engineering approval. Obtain
            CAD/geometry review, grade-specific datasheets and supplier
            quotations before selection.
          </Notice>
        </section>
      </div>
    </div>
  );
}

function FieldSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? "Select…";

  return (
    <div className="space-y-2">
      <Label className="text-[13px] font-bold text-[#344c66]">{label}</Label>
      <Select
        value={value}
        onValueChange={(v) => {
          if (typeof v === "string") onChange(v as T);
        }}
      >
        <SelectTrigger className="h-11 w-full rounded-[10px] border-[#ccd7e4] bg-white px-3">
          <SelectValue>{selectedLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent align="start" className="w-[var(--anchor-width)]">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
