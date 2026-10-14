"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { costs as initialCosts } from "@/data/costs";
import {
  defaultWizardState,
  phaseForStep,
  wizardPhases,
  wizardSteps,
  type WizardPhaseId,
  type WizardStepId,
} from "@/data/wizard";
import { evaluateOptions } from "@/lib/evaluate";
import { cn } from "@/lib/utils";
import { wizardExtraCautions, wizardToBrief } from "@/lib/wizard-map";
import { WizardResults } from "@/components/wizard/wizard-results";
import { WizardStepBody } from "@/components/wizard/wizard-step-body";
import { WizardStepper } from "@/components/wizard/wizard-stepper";
import { WizardSummary } from "@/components/wizard/wizard-summary";
import { WhyThisMatters } from "@/components/wizard/why-this-matters";

export function AdvisorWizard() {
  const [stepId, setStepId] = useState<WizardStepId>("category");
  const [state, setState] = useState(defaultWizardState);
  const [highestIndex, setHighestIndex] = useState(0);

  const stepMeta = wizardSteps.find((s) => s.id === stepId)!;
  const index = wizardSteps.findIndex((s) => s.id === stepId);
  const activePhase = phaseForStep(stepId);
  const isResults = stepId === "results";

  const completedPhases = useMemo(() => {
    const set = new Set<WizardPhaseId>();
    for (const phase of wizardPhases) {
      if (phase.id === "results") continue;
      const lastStepId = phase.stepIds[phase.stepIds.length - 1];
      const lastIdx = wizardSteps.findIndex((s) => s.id === lastStepId);
      if (highestIndex > lastIdx) set.add(phase.id);
    }
    if (isResults) set.add("manufacturing");
    return set;
  }, [highestIndex, isResults]);

  const brief = useMemo(() => wizardToBrief(state), [state]);
  const results = useMemo(
    () =>
      evaluateOptions(brief, initialCosts, {
        targetUnitCost: state.targetUnitCost,
        extraCautions: wizardExtraCautions(state),
      }),
    [brief, state]
  );

  function goToIndex(next: number) {
    const clamped = Math.max(0, Math.min(wizardSteps.length - 1, next));
    setStepId(wizardSteps[clamped].id);
    setHighestIndex((h) => Math.max(h, clamped));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToPhase(phaseId: WizardPhaseId) {
    const phase = wizardPhases.find((p) => p.id === phaseId);
    if (!phase) return;
    const first = phase.stepIds[0];
    const firstIdx = wizardSteps.findIndex((s) => s.id === first);
    if (phaseId === activePhase || completedPhases.has(phaseId) || firstIdx <= highestIndex) {
      goToIndex(firstIdx);
    }
  }

  return (
    <div>
      <section className="overflow-hidden rounded-[20px] bg-gradient-to-br from-[#122640] via-[#1c4776] to-[#2877df] px-6 py-8 text-white md:px-10 md:py-10">
        <div className="max-w-3xl">
          <h1 className="text-[clamp(28px,4vw,40px)] font-bold tracking-tight">
            Find Your Manufacturing Method
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#d3e1f2] md:text-base">
            Answer a few questions about your product, and we&apos;ll recommend
            material and process candidates with explanations and illustrative
            costs — using the current planning model.
          </p>
        </div>
        <div className="mt-6 rounded-2xl bg-white/10 p-3 backdrop-blur-sm md:p-4">
          <WizardStepper
            activePhase={activePhase}
            completedPhases={completedPhases}
            onSelectPhase={goToPhase}
          />
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[210px_minmax(0,1fr)_300px]">
        <nav className="hidden xl:block">
          <Card className="sticky top-24 rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
            <CardContent className="space-y-1 p-3">
              {wizardPhases.map((phase, i) => {
                const active = phase.id === activePhase;
                const done = completedPhases.has(phase.id);
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => goToPhase(phase.id)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                      active
                        ? "bg-[#eaf2ff] text-[#155ab5]"
                        : "text-[#52647b] hover:bg-[#f5f8fc]"
                    }`}
                  >
                    <span
                      className={`flex size-6 items-center justify-center rounded-full text-[11px] ${
                        active
                          ? "bg-[#2877df] text-white"
                          : done
                            ? "bg-[#217b50] text-white"
                            : "bg-[#e4eaf1] text-[#52647b]"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {phase.label}
                  </button>
                );
              })}
              <div className="mt-3 rounded-xl border border-[#e2e8f0] bg-[#f7faff] p-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#17263b]">
                  <HelpCircle className="size-4 text-[#2877df]" />
                  Need help?
                </div>
                <p className="mt-1 text-[12px] leading-relaxed text-[#63748a]">
                  Each step includes a short note on why the choice matters for
                  manufacturing decisions.
                </p>
              </div>
            </CardContent>
          </Card>
        </nav>

        <div>
          <div className="mb-4">
            <div className="text-xs font-bold tracking-[1.4px] text-[#2877df] uppercase">
              Step {Math.min(index + 1, wizardSteps.length - 1)} of{" "}
              {wizardSteps.length - 1}
              {isResults ? " · Results" : ""}
            </div>
            <h2 className="mt-2 text-[clamp(24px,3vw,32px)] font-bold tracking-tight text-[#17263b]">
              {stepMeta.title}
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#63748a]">
              {stepMeta.prompt}
            </p>
          </div>

          <Card className="rounded-2xl border-[#e2e8f0] bg-white shadow-[0_4px_18px_#132a4908]">
            <CardContent className="p-5 md:p-6">
              {isResults ? (
                <WizardResults
                  state={state}
                  results={results}
                  onRestart={() => {
                    setState(defaultWizardState);
                    setHighestIndex(0);
                    goToIndex(0);
                  }}
                  onEditPriorities={() => goToIndex(stepIndexOf("priority"))}
                />
              ) : (
                <WizardStepBody
                  stepId={stepId}
                  state={state}
                  setState={setState}
                />
              )}

              {!isResults && <WhyThisMatters>{stepMeta.why}</WhyThisMatters>}
            </CardContent>
          </Card>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => goToIndex(index - 1)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-11 rounded-[10px] font-semibold text-[#52647b] disabled:opacity-40"
              )}
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            {!isResults && (
              <button
                type="button"
                onClick={() => goToIndex(index + 1)}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "h-11 rounded-[10px] bg-[#2877df] px-5 font-bold text-white hover:bg-[#185fbd]"
                )}
              >
                {stepMeta.nextLabel ?? "Next"}
                <ArrowRight className="size-4" />
              </button>
            )}
            {isResults && (
              <Link
                href="/cost-explorer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "inline-flex h-11 items-center rounded-[10px] bg-[#2877df] px-5 font-bold text-white hover:bg-[#185fbd]"
                )}
              >
                Open Cost Explorer
                <ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <WizardSummary state={state} />
        </div>
      </div>
    </div>
  );
}

function stepIndexOf(id: WizardStepId) {
  return wizardSteps.findIndex((s) => s.id === id);
}
