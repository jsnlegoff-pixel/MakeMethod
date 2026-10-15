import {
  BadgeDollarSign,
  Boxes,
  Factory,
  MapPin,
  Package,
  Sparkles,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  budgetOptions,
  environmentOptions,
  finishOptions,
  priorityOptions,
} from "@/data/advisor-options";
import {
  categoryOptions,
  geometryOptions,
  sizeBandOptions,
  structuralOptions,
  type WizardState,
} from "@/data/wizard";
import { materials } from "@/data/materials";
import { processes } from "@/data/processes";
import { money } from "@/lib/money";

function labelOf<T extends string>(
  options: { value: T; label: string }[],
  value: T
) {
  return options.find((o) => o.value === value)?.label ?? value;
}

export function WizardSummary({ state }: { state: WizardState }) {
  const previewMaterials = materials.slice(0, 4);
  const previewProcesses = processes;

  const rows = [
    {
      icon: Package,
      label: "Product type",
      value: labelOf(categoryOptions, state.category),
    },
    {
      icon: Boxes,
      label: "Geometry",
      value: labelOf(geometryOptions, state.geometry),
    },
    {
      icon: Target,
      label: "Size",
      value: `${labelOf(sizeBandOptions, state.size)} · ${state.lengthMm}×${state.widthMm}×${state.heightMm} mm`,
    },
    {
      icon: MapPin,
      label: "Environment",
      value: labelOf(environmentOptions, state.environment),
    },
    {
      icon: Sparkles,
      label: "Finish / structure",
      value: `${labelOf(finishOptions, state.finish)} · ${labelOf(structuralOptions, state.structural)}`,
    },
    {
      icon: Factory,
      label: "Quantity",
      value: `${state.quantity.toLocaleString()} units`,
    },
    {
      icon: BadgeDollarSign,
      label: "Budget / target",
      value: `${labelOf(budgetOptions, state.budget)} · ${money(state.targetUnitCost)}/unit target`,
    },
    {
      icon: Target,
      label: "Priority",
      value: labelOf(priorityOptions, state.priority),
    },
  ];

  return (
    <aside className="space-y-4">
      <Card className="rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-[#17263b]">
            Your selection so far
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#2877df]">
                <Icon className="size-3.5" />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold tracking-wide text-[#8190a2] uppercase">
                  {label}
                </div>
                <div className="truncate text-sm font-medium text-[#17263b]">
                  {value}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-[#17263b]">
            Materials in current library
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-[12px] leading-relaxed text-[#63748a]">
            Preview only — shortlist screening still uses the current planning
            model; specialty tags in the library are educational, not
            certifications.
          </p>
          {previewMaterials.map((m) => (
            <div key={m.id} className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-[#eaf2ff] text-xs font-bold text-[#155ab5]">
                {m.name.slice(0, 2)}
              </span>
              <div>
                <div className="text-sm font-semibold text-[#17263b]">
                  {m.name}
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {m.pros.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-full bg-[#edf3fa] text-[10px] font-medium text-[#385b80]"
                    >
                      {tag.split(" ").slice(0, 2).join(" ")}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-[#17263b]">
            Popular processes
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          {previewProcesses.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-[#e2e8f0] bg-[#f7faff] px-3 py-2.5"
            >
              <div className="text-xs font-bold text-[#155ab5]">{p.family}</div>
              <div className="mt-0.5 text-sm font-semibold text-[#17263b]">
                {p.name}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
