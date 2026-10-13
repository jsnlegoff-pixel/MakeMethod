import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function SelectionCard({
  selected,
  onSelect,
  title,
  description,
  examples,
  media,
  className,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description: string;
  examples?: string;
  media?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-white p-4 text-left shadow-[0_4px_18px_#132a4908] transition",
        selected
          ? "border-[#2877df] ring-2 ring-[#2877df]/25"
          : "border-[#e2e8f0] hover:-translate-y-0.5 hover:border-[#8eb7ef]",
        className
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-full bg-[#2877df] text-white">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      )}
      {media}
      <h3 className="mt-3 text-base font-semibold text-[#17263b]">{title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-[#63748a]">
        {description}
      </p>
      {examples && (
        <p className="mt-2 text-xs font-medium text-[#385b80]">
          Examples: {examples}
        </p>
      )}
    </button>
  );
}
