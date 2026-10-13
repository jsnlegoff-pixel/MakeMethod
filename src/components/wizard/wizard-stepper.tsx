import { Check } from "lucide-react";
import { wizardPhases, type WizardPhaseId } from "@/data/wizard";
import { cn } from "@/lib/utils";

export function WizardStepper({
  activePhase,
  completedPhases,
  onSelectPhase,
}: {
  activePhase: WizardPhaseId;
  completedPhases: Set<WizardPhaseId>;
  onSelectPhase: (phase: WizardPhaseId) => void;
}) {
  return (
    <ol className="flex flex-wrap items-center gap-2 md:gap-0">
      {wizardPhases.map((phase, index) => {
        const active = phase.id === activePhase;
        const done = completedPhases.has(phase.id) && !active;
        const clickable = done || active || completedPhases.has(phase.id);

        return (
          <li key={phase.id} className="flex items-center">
            <button
              type="button"
              disabled={!clickable && !active}
              onClick={() => onSelectPhase(phase.id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-2 py-1.5 text-left transition",
                active && "bg-white/15",
                !clickable && !active && "opacity-50"
              )}
            >
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-xs font-bold",
                  active && "bg-[#2877df] text-white",
                  done && "bg-[#217b50] text-white",
                  !active && !done && "bg-[#e4eaf1] text-[#52647b]"
                )}
              >
                {done ? <Check className="size-3.5" strokeWidth={3} /> : index + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-semibold sm:inline",
                  active ? "text-white" : "text-white/75"
                )}
              >
                {phase.label}
              </span>
            </button>
            {index < wizardPhases.length - 1 && (
              <div className="mx-1 hidden h-px w-8 bg-[#d7e0eb] md:block lg:w-12" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
