"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Eyebrow } from "@/components/eyebrow";
import { costs as seedCosts } from "@/data/costs";
import { defaultAdvisorBrief } from "@/data/advisor-options";
import type { CostCombination } from "@/data/types";
import { evaluateOptions } from "@/lib/evaluate";
import { money } from "@/lib/money";

export function CostExplorerPanel() {
  const [quantity, setQuantity] = useState(defaultAdvisorBrief.quantity);
  const [costRows, setCostRows] = useState<CostCombination[]>(() =>
    seedCosts.map((c) => ({ ...c }))
  );

  const brief = useMemo(
    () => ({ ...defaultAdvisorBrief, quantity }),
    [quantity]
  );
  const data = useMemo(
    () => evaluateOptions(brief, costRows),
    [brief, costRows]
  );
  const maxTotal = Math.max(...data.map((x) => x.total), 1);
  const sliderValue = Math.min(Math.max(quantity, 100), 10000);

  function updateCost(
    id: string,
    key: "setup" | "unit",
    raw: string
  ) {
    const next = Math.max(0, Number(raw) || 0);
    setCostRows((rows) =>
      rows.map((row) => (row.id === id ? { ...row, [key]: next } : row))
    );
  }

  return (
    <div>
      <Eyebrow>Manufacturing Economics</Eyebrow>
      <h1 className="mt-2 text-[clamp(32px,5vw,43px)] font-bold tracking-tight text-[#17263b]">
        Cost Explorer
      </h1>
      <p className="mt-3 max-w-[750px] leading-relaxed text-[#63748a]">
        Adjust production volume and explore how setup investment changes cost
        per part. Change the assumptions to test your own supplier estimates.
      </p>

      <Card className="mt-8 rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-[#17263b]">
              Production quantity
            </h3>
            <strong className="text-[#17263b]">
              {quantity.toLocaleString()} units
            </strong>
          </div>

          <input
            aria-label="Production quantity"
            type="range"
            min={100}
            max={10000}
            step={100}
            value={sliderValue}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-[#2877df]"
          />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["Lowest modeled total", money(data[0]?.total ?? 0)],
              ["Lowest modeled per part", money(data[0]?.per ?? 0)],
              [
                "Candidates",
                String(data.filter((x) => x.feasible).length),
              ],
              ["Volume", quantity.toLocaleString()],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl bg-[#f0f5fc] p-4"
              >
                <span className="text-[13px] text-[#63748a]">{label}</span>
                <strong className="mt-1 block text-[23px] text-[#17263b]">
                  {value}
                </strong>
              </div>
            ))}
          </div>

          <Separator />

          <div>
            <h3 className="mb-2 text-lg font-semibold text-[#17263b]">
              Modeled total cost by process
            </h3>
            {data.map((x) => (
              <div
                key={x.id}
                className="my-3.5 grid grid-cols-[95px_1fr_75px] items-center gap-3 text-[11px] md:grid-cols-[155px_1fr_92px] md:text-[13px]"
              >
                <span className="truncate text-[#17263b]">{x.name}</span>
                <div className="h-[11px] overflow-hidden rounded-[9px] bg-[#eaf0f6]">
                  <div
                    className="h-full rounded-[9px] bg-[#2877df] transition-all"
                    style={{ width: `${(100 * x.total) / maxTotal}%` }}
                  />
                </div>
                <strong className="text-right text-[#17263b]">
                  {money(x.total)}
                </strong>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8 rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
        <CardHeader>
          <CardTitle className="text-lg">Model assumptions — editable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#f7f9fc] text-left text-[#536780]">
                  <th className="border-b border-[#e6ebf1] px-3 py-3.5 font-medium">
                    Material + process
                  </th>
                  <th className="border-b border-[#e6ebf1] px-3 py-3.5 font-medium">
                    Setup/tooling ($)
                  </th>
                  <th className="border-b border-[#e6ebf1] px-3 py-3.5 font-medium">
                    Variable cost/unit ($)
                  </th>
                  <th className="border-b border-[#e6ebf1] px-3 py-3.5 font-medium">
                    Modeled total
                  </th>
                </tr>
              </thead>
              <tbody>
                {costRows.map((x) => (
                  <tr key={x.id}>
                    <td className="border-b border-[#e6ebf1] px-3 py-3.5 text-[#17263b]">
                      {x.name}
                    </td>
                    <td className="border-b border-[#e6ebf1] px-3 py-3.5">
                      <Input
                        aria-label={`${x.name} setup`}
                        type="number"
                        min={0}
                        value={x.setup}
                        onChange={(e) =>
                          updateCost(x.id, "setup", e.target.value)
                        }
                        className="h-10 rounded-[10px] border-[#ccd7e4]"
                      />
                    </td>
                    <td className="border-b border-[#e6ebf1] px-3 py-3.5">
                      <Input
                        aria-label={`${x.name} variable cost`}
                        type="number"
                        min={0}
                        step={0.1}
                        value={x.unit}
                        onChange={(e) =>
                          updateCost(x.id, "unit", e.target.value)
                        }
                        className="h-10 rounded-[10px] border-[#ccd7e4]"
                      />
                    </td>
                    <td className="border-b border-[#e6ebf1] px-3 py-3.5 font-semibold text-[#17263b]">
                      {money(x.setup + x.unit * quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-[#63748a]">
            Simple model: total = setup/tooling + (quantity × variable unit
            cost). Excludes taxes, freight, packaging, development and many
            secondary costs. No live supplier pricing is connected. Figures are
            illustrative planning inputs, not supplier quotes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
