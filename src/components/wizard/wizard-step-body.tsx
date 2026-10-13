import type { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  type WizardStepId,
} from "@/data/wizard";
import { GeometryArt } from "@/components/wizard/geometry-art";
import { SelectionCard } from "@/components/wizard/selection-card";
import { sizeFromDimensions } from "@/lib/wizard-map";

export function WizardStepBody({
  stepId,
  state,
  setState,
}: {
  stepId: WizardStepId;
  state: WizardState;
  setState: Dispatch<SetStateAction<WizardState>>;
}) {
  function patch(partial: Partial<WizardState>) {
    setState((prev) => ({ ...prev, ...partial }));
  }

  if (stepId === "category") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {categoryOptions.map((opt) => (
          <SelectionCard
            key={opt.value}
            selected={state.category === opt.value}
            onSelect={() => patch({ category: opt.value })}
            title={opt.label}
            description={opt.desc}
            examples={opt.examples}
          />
        ))}
      </div>
    );
  }

  if (stepId === "size") {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {sizeBandOptions.map((opt) => (
            <SelectionCard
              key={opt.value}
              selected={state.size === opt.value}
              onSelect={() =>
                patch({
                  size: opt.value,
                  ...opt.defaults,
                })
              }
              title={opt.label}
              description={opt.hint}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(
            [
              ["lengthMm", "Length (mm)"],
              ["widthMm", "Width (mm)"],
              ["heightMm", "Height (mm)"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <Label className="text-[13px] font-bold text-[#344c66]">
                {label}
              </Label>
              <Input
                type="number"
                min={1}
                max={5000}
                value={state[key]}
                onChange={(e) => {
                  const next = Math.max(1, Number(e.target.value) || 1);
                  const dims = {
                    lengthMm: state.lengthMm,
                    widthMm: state.widthMm,
                    heightMm: state.heightMm,
                    [key]: next,
                  };
                  patch({
                    [key]: next,
                    size: sizeFromDimensions(
                      dims.lengthMm,
                      dims.widthMm,
                      dims.heightMm
                    ),
                  });
                }}
                className="h-11 rounded-[10px] border-[#ccd7e4]"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stepId === "geometry") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {geometryOptions.map((opt) => (
          <SelectionCard
            key={opt.value}
            selected={state.geometry === opt.value}
            onSelect={() => patch({ geometry: opt.value })}
            title={opt.label}
            description={opt.desc}
            examples={opt.examples}
            media={<GeometryArt id={opt.value} />}
          />
        ))}
      </div>
    );
  }

  if (stepId === "environment") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {environmentOptions.map((opt) => (
          <SelectionCard
            key={opt.value}
            selected={state.environment === opt.value}
            onSelect={() => patch({ environment: opt.value })}
            title={opt.label}
            description={
              opt.value === "indoor"
                ? "Controlled indoor use with limited UV exposure"
                : "Sunlight, weather, or outdoor exposure likely"
            }
          />
        ))}
      </div>
    );
  }

  if (stepId === "structural") {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {structuralOptions.map((opt) => (
          <SelectionCard
            key={opt.value}
            selected={state.structural === opt.value}
            onSelect={() => patch({ structural: opt.value })}
            title={opt.label}
            description={opt.desc}
          />
        ))}
      </div>
    );
  }

  if (stepId === "finish") {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {finishOptions.map((opt) => (
          <SelectionCard
            key={opt.value}
            selected={state.finish === opt.value}
            onSelect={() => patch({ finish: opt.value })}
            title={opt.label}
            description={
              opt.value === "basic"
                ? "Functional surfaces; cosmetics secondary"
                : opt.value === "standard"
                  ? "Typical consumer appearance without premium polish"
                  : "High cosmetic expectation; finishing may be required"
            }
          />
        ))}
      </div>
    );
  }

  if (stepId === "quantity") {
    return (
      <div className="mx-auto max-w-md space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="wizard-quantity"
            className="text-[13px] font-bold text-[#344c66]"
          >
            Production quantity
          </Label>
          <Input
            id="wizard-quantity"
            type="number"
            min={1}
            max={1000000}
            value={state.quantity}
            onChange={(e) =>
              patch({ quantity: Math.max(1, Number(e.target.value) || 1) })
            }
            className="h-12 rounded-[10px] border-[#ccd7e4] text-lg"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[50, 500, 2000, 10000].map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => patch({ quantity: q })}
              className="rounded-full border border-[#d7e0eb] bg-white px-3 py-1.5 text-sm font-semibold text-[#243b57] hover:border-[#2877df]"
            >
              {q.toLocaleString()} units
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (stepId === "budget") {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {budgetOptions.map((opt) => (
          <SelectionCard
            key={opt.value}
            selected={state.budget === opt.value}
            onSelect={() => patch({ budget: opt.value })}
            title={opt.label}
            description={
              opt.value === "under1000"
                ? "Favors low/no tooling processes"
                : opt.value === "1000-5000"
                  ? "Room for modest thermoform tools or soft tooling"
                  : "Open to production molds when volume justifies them"
            }
          />
        ))}
      </div>
    );
  }

  if (stepId === "targetCost") {
    return (
      <div className="mx-auto max-w-md space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="wizard-target"
            className="text-[13px] font-bold text-[#344c66]"
          >
            Target unit cost (USD)
          </Label>
          <Input
            id="wizard-target"
            type="number"
            min={0}
            step={0.5}
            value={state.targetUnitCost}
            onChange={(e) =>
              patch({
                targetUnitCost: Math.max(0, Number(e.target.value) || 0),
              })
            }
            className="h-12 rounded-[10px] border-[#ccd7e4] text-lg"
          />
        </div>
        <p className="text-sm text-[#63748a]">
          Options whose modeled amortized unit cost exceeds this target are
          flagged for review. Set 0 to disable the target screen.
        </p>
      </div>
    );
  }

  if (stepId === "priority") {
    return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {priorityOptions.map((opt) => (
          <SelectionCard
            key={opt.value}
            selected={state.priority === opt.value}
            onSelect={() => patch({ priority: opt.value })}
            title={opt.label}
            description={
              opt.value === "cost"
                ? "Rank by lowest modeled total cost first"
                : opt.value === "quality"
                  ? "Prefer processes that support cleaner cosmetics"
                  : "Prefer lower setup spend and design flexibility"
            }
          />
        ))}
      </div>
    );
  }

  return null;
}
